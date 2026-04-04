import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

import { PROJECT_TYPE_LABELS, PROJECT_TYPE_VALUES } from '@/lib/project-applications';

export const runtime = 'nodejs';

const projectApplicationSchema = z.object({
  projectName: z.string().trim().min(1),
  projectType: z.enum(PROJECT_TYPE_VALUES),
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
  return `ideatovalue 收到新的项目申请

项目名称：${data.projectName}
项目类型：${PROJECT_TYPE_LABELS[data.projectType]}
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
  const sections: Array<[string, string]> = [
    ['项目名称', escapeHtml(data.projectName)],
    ['项目类型', escapeHtml(PROJECT_TYPE_LABELS[data.projectType])],
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
    const body = await request.json();
    const data = projectApplicationSchema.parse(body);

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const mailTo = process.env.PROJECT_APPLICATION_TO?.trim() || 'lux932519@gmail.com';
    const mailFrom = process.env.SMTP_FROM?.trim() || smtpUser;
    const missingEnvVars = [
      ['SMTP_HOST', smtpHost],
      ['SMTP_USER', smtpUser],
      ['SMTP_PASS', smtpPass],
      ['SMTP_FROM', mailFrom],
    ]
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingEnvVars.length > 0) {
      console.error('项目申请邮件环境变量缺失:', {
        missingEnvVars,
        vercelEnv: process.env.VERCEL_ENV,
        nodeEnv: process.env.NODE_ENV,
      });

      return NextResponse.json(
        { message: `邮件服务尚未配置完成，缺少：${missingEnvVars.join('、')}。` },
        { status: 500 }
      );
    }

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

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: '提交内容不完整或格式不正确，请检查后重试。' },
        { status: 400 }
      );
    }

    console.error('项目申请邮件发送失败:', error);

    return NextResponse.json(
      { message: '提交成功前的邮件发送失败，请稍后重试或检查邮件配置。' },
      { status: 500 }
    );
  }
}
