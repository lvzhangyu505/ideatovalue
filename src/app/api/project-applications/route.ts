import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getProjectSubcategoryOptions, PROJECT_PUBLIC_STAGE_OPTIONS, PROJECT_TYPE_VALUES } from '@/lib/project-applications';
import { sendProjectApplicationAdminMail } from '@/lib/project-notification-email';
import { createSupabaseServiceClient, getUserFromAccessToken, isSupabaseServerConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const projectApplicationSchema = z.object({
  projectName: z.string().trim().min(1),
  projectType: z.enum(PROJECT_TYPE_VALUES),
  projectSubcategory: z.string().trim().min(1),
  description: z.string().trim().min(1),
  goal: z.string().trim().min(1),
  problem: z.string().trim().min(1),
  audience: z.string().trim().min(1),
  solution: z.string().trim().min(1),
  verification: z.string().trim().min(1),
  existingResources: z.string().trim().min(1),
  neededResources: z.string().trim().min(1),
  keyRisks: z.string().trim().min(1),
  riskResponses: z.string().trim().min(1),
  timeline: z.string().trim().min(1),
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
  contactName: z.string().trim().min(1),
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().optional().default(''),
});

function getAuthorizationToken(request: Request) {
  const header = request.headers.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    return '';
  }

  return header.slice('Bearer '.length).trim();
}

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

export async function POST(request: Request) {
  try {
    if (!isSupabaseServerConfigured()) {
      return NextResponse.json(
        { message: '项目提交流程尚未配置完成，请先补充 Supabase 服务端环境变量。' },
        { status: 500 }
      );
    }

    const accessToken = getAuthorizationToken(request);

    if (!accessToken) {
      return NextResponse.json({ message: '请先登录，再提交项目申请。' }, { status: 401 });
    }

    const body = await request.json();
    const data = projectApplicationSchema.parse(body);
    const subcategoryExists = getProjectSubcategoryOptions(data.projectType).some(
      (item) => item.value === data.projectSubcategory
    );
    const supportTiers = parseSupportTiers(data.supportTiers);
    const latestUpdates = splitMultilineLines(data.latestUpdates);

    if (!subcategoryExists) {
      return NextResponse.json({ message: '二级分类与项目类型不匹配，请重新选择。' }, { status: 400 });
    }

    if (data.supportTiers.trim() && supportTiers.length === 0) {
      return NextResponse.json(
        { message: '支持档位格式不正确，请按“29 元：档位说明”逐行填写。' },
        { status: 400 }
      );
    }

    const user = await getUserFromAccessToken(accessToken);

    if (!user?.email) {
      return NextResponse.json({ message: '当前登录状态无效，请重新登录。' }, { status: 401 });
    }

    const supabase = createSupabaseServiceClient();
    const { error: insertError } = await supabase.from('project_submissions').insert({
      user_id: user.id,
      user_email: user.email,
      user_name:
        (typeof user.user_metadata.display_name === 'string' && user.user_metadata.display_name.trim()) ||
        data.contactName,
      project_name: data.projectName,
      project_type: data.projectType,
      project_subcategory: data.projectSubcategory,
      description: data.description,
      goal: data.goal,
      problem: data.problem,
      audience: data.audience,
      solution: data.solution,
      verification: data.verification,
      existing_resources: data.existingResources,
      needed_resources: data.neededResources,
      key_risks: data.keyRisks,
      risk_responses: data.riskResponses,
      timeline: data.timeline,
      public_stage: data.publicStage,
      badge_label: data.badgeLabel || '平台审核通过',
      completion_rate: data.completionRate,
      supporter_count: data.supporterCount,
      days_left: data.daysLeft,
      support_tiers: supportTiers,
      latest_updates: latestUpdates,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone || null,
      status: 'pending',
    });

    if (insertError) {
      console.error('项目申请入库失败:', insertError);
      return NextResponse.json(
        { message: `项目已填写完成，但保存申请记录失败：${insertError.message}` },
        { status: 500 }
      );
    }

    try {
      await sendProjectApplicationAdminMail({
        projectName: data.projectName,
        projectType: data.projectType,
        projectSubcategory: data.projectSubcategory,
        description: data.description,
        goal: data.goal,
        problem: data.problem,
        audience: data.audience,
        solution: data.solution,
        verification: data.verification,
        existingResources: data.existingResources,
        neededResources: data.neededResources,
        keyRisks: data.keyRisks,
        riskResponses: data.riskResponses,
        timeline: data.timeline,
        publicStage:
          PROJECT_PUBLIC_STAGE_OPTIONS.find((option) => option.slug === data.publicStage)?.label || data.publicStage,
        badgeLabel: data.badgeLabel || '平台审核通过',
        completionRate: data.completionRate,
        supporterCount: data.supporterCount,
        daysLeft: data.daysLeft,
        supportTiers: supportTiers.map((tier) => `${tier.amount} 元：${tier.description}`),
        latestUpdates,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || '',
      });
    } catch (mailError) {
      console.error('项目申请邮件发送失败，但申请已入库:', mailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: '提交内容不完整或格式不正确，请检查后重试。' },
        { status: 400 }
      );
    }

    console.error('项目申请提交失败:', error);
    return NextResponse.json(
      { message: '项目申请提交失败，请稍后重试。' },
      { status: 500 }
    );
  }
}
