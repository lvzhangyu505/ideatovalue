import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

import {
  getProjectSubcategoryOptions,
  PROJECT_TYPE_LABELS,
  PROJECT_TYPE_VALUES,
} from '@/lib/project-applications';
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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replaceAll('\n', '<br />');
}

function buildTextContent(data: z.infer<typeof projectApplicationSchema>) {
  const secondaryLabel =
    getProjectSubcategoryOptions(data.projectType).find((item) => item.value === data.projectSubcategory)?.label ||
    data.projectSubcategory;

  return `ideatovalue 收到新的项目申请

项目名称：${data.projectName}
项目类型：${PROJECT_TYPE_LABELS[data.projectType]}
二级分类：${secondaryLabel}
项目简介：${data.description}

项目目标：
${data.goal}

要解决的问题：
${data.problem}

面向对象 / 受众：
${data.audience}

方案路径：
${data.solution}

验证标准：
${data.verification}

当前已有资源：
${data.existingResources}

当前仍需支持：
${data.neededResources}

关键风险：
${data.keyRisks}

应对思路：
${data.riskResponses}

时间安排：
${data.timeline}

联系人：${data.contactName}
联系邮箱：${data.contactEmail}
联系电话：${data.contactPhone || '未填写'}
`;
}

function buildHtmlContent(data: z.infer<typeof projectApplicationSchema>) {
  const secondaryLabel =
    getProjectSubcategoryOptions(data.projectType).find((item) => item.value === data.projectSubcategory)?.label ||
    data.projectSubcategory;

  const sections: Array<[string, string]> = [
    ['项目名称', escapeHtml(data.projectName)],
    ['项目类型', escapeHtml(PROJECT_TYPE_LABELS[data.projectType])],
    ['二级分类', escapeHtml(secondaryLabel)],
    ['项目简介', formatMultilineHtml(data.description)],
    ['项目目标', formatMultilineHtml(data.goal)],
    ['要解决的问题', formatMultilineHtml(data.problem)],
    ['面向对象 / 受众', formatMultilineHtml(data.audience)],
    ['方案路径', formatMultilineHtml(data.solution)],
    ['验证标准', formatMultilineHtml(data.verification)],
    ['当前已有资源', formatMultilineHtml(data.existingResources)],
    ['当前仍需支持', formatMultilineHtml(data.neededResources)],
    ['关键风险', formatMultilineHtml(data.keyRisks)],
    ['应对思路', formatMultilineHtml(data.riskResponses)],
    ['时间安排', formatMultilineHtml(data.timeline)],
    ['联系人', escapeHtml(data.contactName)],
    ['联系邮箱', escapeHtml(data.contactEmail)],
    ['联系电话', escapeHtml(data.contactPhone || '未填写')],
  ];

  const items = sections
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #e2e8f0;width:180px;font-weight:600;color:#334155;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;border:1px solid #e2e8f0;color:#475569;line-height:1.8;">${value}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
      <div style="max-width:840px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);color:#ffffff;">
          <h1 style="margin:0 0 8px;font-size:24px;">收到新的项目申请</h1>
          <p style="margin:0;opacity:0.9;">来自 ideatovalue 发起项目表单的最新提交</p>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;background:#ffffff;">
            ${items}
          </table>
        </div>
      </div>
    </div>
  `;
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

    if (!subcategoryExists) {
      return NextResponse.json({ message: '二级分类与项目类型不匹配，请重新选择。' }, { status: 400 });
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
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone || null,
      status: 'pending',
    });

    if (insertError) {
      console.error('项目申请入库失败:', insertError);
      return NextResponse.json({ message: '项目已填写完成，但保存申请记录失败，请稍后重试。' }, { status: 500 });
    }

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const mailTo = process.env.PROJECT_APPLICATION_TO?.trim() || 'lux932519@gmail.com';
    const mailFrom = process.env.SMTP_FROM?.trim() || smtpUser;

    if (smtpHost && smtpUser && smtpPass && mailFrom) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: mailFrom,
          to: mailTo,
          replyTo: data.contactEmail,
          subject: `[ideatovalue] 新项目申请：${data.projectName}`,
          text: buildTextContent(data),
          html: buildHtmlContent(data),
        });
      } catch (mailError) {
        console.error('项目申请邮件发送失败，但申请已入库:', mailError);
      }
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
