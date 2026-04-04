import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createSupabaseServiceClient, getUserFromAccessToken, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { PROJECT_PUBLIC_STAGE_OPTIONS } from '@/lib/project-applications';

export const runtime = 'nodejs';

function getAuthorizationToken(request: Request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return '';
  }

  return header.slice('Bearer '.length).trim();
}

const updateSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  publicStage: z
    .string()
    .trim()
    .refine(
      (value) => PROJECT_PUBLIC_STAGE_OPTIONS.some((option) => option.slug === value),
      '公开阶段不合法'
    ),
  badgeLabel: z.string().trim().max(40).optional().default('平台审核通过'),
  completionRate: z.coerce.number().int().min(0).max(100).default(0),
  supporterCount: z.coerce.number().int().min(0).default(0),
  daysLeft: z.coerce.number().int().min(0).default(30),
  supportTiers: z.string().trim().optional().default(''),
  latestUpdates: z.string().trim().optional().default(''),
});

function splitMultilineLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSupportTiers(value: string) {
  return splitMultilineLines(value)
    .map((line) => {
      const match = line.match(/^(\d+(?:\.\d+)?)\s*元?\s*[：:]\s*(.+)$/);

      if (!match) {
        return null;
      }

      return {
        amount: Number.parseFloat(match[1]),
        description: match[2].trim(),
      };
    })
    .filter((item): item is { amount: number; description: string } => Boolean(item));
}

export async function GET(request: Request) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ submissions: [] });
  }

  try {
    const accessToken = getAuthorizationToken(request);
    if (!accessToken) {
      return NextResponse.json({ message: '请先登录。' }, { status: 401 });
    }

    const user = await getUserFromAccessToken(accessToken);
    if (!user?.email) {
      return NextResponse.json({ message: '当前登录状态无效，请重新登录。' }, { status: 401 });
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    console.error('读取我的项目申请失败:', error);
    return NextResponse.json({ message: '读取我的项目申请失败。' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ message: 'Supabase 服务端环境变量未配置。' }, { status: 500 });
  }

  try {
    const accessToken = getAuthorizationToken(request);
    if (!accessToken) {
      return NextResponse.json({ message: '请先登录。' }, { status: 401 });
    }

    const user = await getUserFromAccessToken(accessToken);
    if (!user?.email) {
      return NextResponse.json({ message: '当前登录状态无效，请重新登录。' }, { status: 401 });
    }

    const body = await request.json();
    const data = updateSubmissionSchema.parse(body);
    const supportTiers = parseSupportTiers(data.supportTiers);
    const latestUpdates = splitMultilineLines(data.latestUpdates);

    if (data.supportTiers.trim() && supportTiers.length === 0) {
      return NextResponse.json(
        { message: '支持档位格式不正确，请按“29 元：档位说明”逐行填写。' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();
    const { data: existing, error: existingError } = await supabase
      .from('project_submissions')
      .select('id, user_id')
      .eq('id', data.submissionId)
      .maybeSingle();

    if (existingError || !existing) {
      return NextResponse.json({ message: '没有找到对应的项目申请。' }, { status: 404 });
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json({ message: '你没有权限编辑这条项目记录。' }, { status: 403 });
    }

    const { error } = await supabase
      .from('project_submissions')
      .update({
        public_stage: data.publicStage,
        badge_label: data.badgeLabel || '平台审核通过',
        completion_rate: data.completionRate,
        supporter_count: data.supporterCount,
        days_left: data.daysLeft,
        support_tiers: supportTiers,
        latest_updates: latestUpdates,
      })
      .eq('id', data.submissionId);

    if (error) {
      return NextResponse.json(
        { message: `更新项目公开信息失败：${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: '公开信息已更新。' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: '补充信息格式不正确，请检查后重试。' }, { status: 400 });
    }

    console.error('更新项目公开信息失败:', error);
    return NextResponse.json({ message: '更新项目公开信息失败，请稍后重试。' }, { status: 500 });
  }
}
