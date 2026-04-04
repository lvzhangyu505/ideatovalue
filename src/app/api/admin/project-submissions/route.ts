import { NextResponse } from 'next/server';
import { z } from 'zod';

import { sendProjectReviewNotificationMail } from '@/lib/project-notification-email';
import { SUBMISSION_STATUS_VALUES } from '@/lib/project-submissions';
import {
  createSupabaseServiceClient,
  getUserFromAccessToken,
  isAdminUser,
  isSupabaseServerConfigured,
} from '@/lib/supabase/server';

export const runtime = 'nodejs';

const reviewSchema = z.object({
  submissionId: z.string().uuid(),
  status: z.enum(['approved', 'rejected']),
  reviewNote: z.string().trim().optional().default(''),
});

function getAuthorizationToken(request: Request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return '';
  }

  return header.slice('Bearer '.length).trim();
}

async function requireAdminUser(request: Request) {
  const accessToken = getAuthorizationToken(request);
  if (!accessToken) {
    return { error: NextResponse.json({ message: '请先登录。' }, { status: 401 }) };
  }

  const user = await getUserFromAccessToken(accessToken);
  if (!isAdminUser(user)) {
    return { error: NextResponse.json({ message: '你没有管理后台权限。' }, { status: 403 }) };
  }

  return { user };
}

export async function GET(request: Request) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ submissions: [] });
  }

  try {
    const auth = await requireAdminUser(request);
    if ('error' in auth) {
      return auth.error;
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .in('status', [...SUBMISSION_STATUS_VALUES])
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    console.error('读取后台项目申请失败:', error);
    return NextResponse.json({ message: '读取后台项目申请失败。' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ message: 'Supabase 服务端环境变量未配置。' }, { status: 500 });
  }

  try {
    const auth = await requireAdminUser(request);
    if ('error' in auth) {
      return auth.error;
    }

    const body = await request.json();
    const data = reviewSchema.parse(body);
    const supabase = createSupabaseServiceClient();
    const { data: submission, error: submissionError } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('id', data.submissionId)
      .maybeSingle();

    if (submissionError || !submission) {
      return NextResponse.json({ message: '没有找到对应的项目申请。' }, { status: 404 });
    }

    const { error } = await supabase
      .from('project_submissions')
      .update({
        status: data.status,
        review_note: data.reviewNote || null,
        reviewer_email: auth.user.email,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', data.submissionId);

    if (error) {
      throw error;
    }

    let mailResult = {
      sent: false,
      message: '未执行邮件发送。',
    };

    try {
      const origin = request.headers.get('origin') || new URL(request.url).origin;
      mailResult = await sendProjectReviewNotificationMail({
        projectName: submission.project_name,
        projectType: submission.project_type,
        projectSubcategory: submission.project_subcategory,
        recipientEmail: submission.contact_email || submission.user_email,
        recipientName: submission.contact_name || submission.user_name || '发起人',
        status: data.status,
        reviewNote: data.reviewNote || null,
        projectUrl: data.status === 'approved' ? `${origin}/projects/submission-${submission.id}` : null,
      });
    } catch (mailError) {
      console.error('审核结果邮件发送失败，但审核状态已更新:', mailError);
      mailResult = {
        sent: false,
        message: '审核状态已更新，但邮件发送失败，请检查 SMTP 配置或收件地址。',
      };
    }

    return NextResponse.json({
      success: true,
      mailSent: mailResult.sent,
      message: mailResult.message,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: '审核参数不正确。' }, { status: 400 });
    }

    console.error('审核项目申请失败:', error);
    return NextResponse.json({ message: '审核项目申请失败。' }, { status: 500 });
  }
}
