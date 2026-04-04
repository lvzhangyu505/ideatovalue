import nodemailer from 'nodemailer';

import { getProjectSubcategoryOptions, PROJECT_TYPE_LABELS } from '@/lib/project-applications';
import type { SubmissionStatus } from '@/lib/project-submissions';

type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type ApplicationNotificationInput = {
  projectName: string;
  projectType: string;
  projectSubcategory: string;
  description: string;
  goal: string;
  problem: string;
  audience: string;
  solution: string;
  verification: string;
  existingResources: string;
  neededResources: string;
  keyRisks: string;
  riskResponses: string;
  timeline: string;
  publicStage: string;
  badgeLabel: string;
  completionRate: number;
  supporterCount: number;
  daysLeft: number;
  supportTiers: string[];
  latestUpdates: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

type ReviewNotificationInput = {
  projectName: string;
  projectType: string;
  projectSubcategory: string;
  recipientEmail: string;
  recipientName: string;
  status: SubmissionStatus;
  reviewNote?: string | null;
  projectUrl?: string | null;
};

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

function getSecondaryLabel(projectType: string, projectSubcategory: string) {
  return (
    getProjectSubcategoryOptions(projectType).find((item) => item.value === projectSubcategory)?.label ||
    projectSubcategory
  );
}

function getMailConfig() {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number.parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const mailFrom = process.env.SMTP_FROM?.trim() || smtpUser;

  return {
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    mailFrom,
  };
}

export function isProjectMailConfigured() {
  const { smtpHost, smtpUser, smtpPass, mailFrom } = getMailConfig();
  return Boolean(smtpHost && smtpUser && smtpPass && mailFrom);
}

export async function sendProjectNotificationMail({ to, subject, text, html, replyTo }: SendMailInput) {
  const { smtpHost, smtpPort, smtpUser, smtpPass, mailFrom } = getMailConfig();

  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
    return false;
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
    to,
    replyTo,
    subject,
    text,
    html,
  });

  return true;
}

export async function sendProjectApplicationAdminMail(input: ApplicationNotificationInput) {
  const mailTo = process.env.PROJECT_APPLICATION_TO?.trim() || 'lux932519@gmail.com';
  const secondaryLabel = getSecondaryLabel(input.projectType, input.projectSubcategory);
  const supportTiersText = input.supportTiers.length > 0 ? input.supportTiers.join('\n') : '未填写';
  const latestUpdatesText = input.latestUpdates.length > 0 ? input.latestUpdates.join('\n') : '未填写';

  const text = `ideatovalue 收到新的项目申请

项目名称：${input.projectName}
项目类型：${PROJECT_TYPE_LABELS[input.projectType]}
二级分类：${secondaryLabel}
项目简介：${input.description}

项目目标：
${input.goal}

要解决的问题：
${input.problem}

面向对象 / 受众：
${input.audience}

方案路径：
${input.solution}

验证标准：
${input.verification}

当前已有资源：
${input.existingResources}

当前仍需支持：
${input.neededResources}

关键风险：
${input.keyRisks}

应对思路：
${input.riskResponses}

时间安排：
${input.timeline}

公开展示阶段：${input.publicStage}
推荐标签：${input.badgeLabel || '平台审核通过'}
当前进度：${input.completionRate}%
预估支持人数：${input.supporterCount}
剩余时间：${input.daysLeft} 天

支持档位：
${supportTiersText}

最新更新：
${latestUpdatesText}

联系人：${input.contactName}
联系邮箱：${input.contactEmail}
联系电话：${input.contactPhone || '未填写'}
`;

  const sections: Array<[string, string]> = [
    ['项目名称', escapeHtml(input.projectName)],
    ['项目类型', escapeHtml(PROJECT_TYPE_LABELS[input.projectType])],
    ['二级分类', escapeHtml(secondaryLabel)],
    ['项目简介', formatMultilineHtml(input.description)],
    ['项目目标', formatMultilineHtml(input.goal)],
    ['要解决的问题', formatMultilineHtml(input.problem)],
    ['面向对象 / 受众', formatMultilineHtml(input.audience)],
    ['方案路径', formatMultilineHtml(input.solution)],
    ['验证标准', formatMultilineHtml(input.verification)],
    ['当前已有资源', formatMultilineHtml(input.existingResources)],
    ['当前仍需支持', formatMultilineHtml(input.neededResources)],
    ['关键风险', formatMultilineHtml(input.keyRisks)],
    ['应对思路', formatMultilineHtml(input.riskResponses)],
    ['时间安排', formatMultilineHtml(input.timeline)],
    ['公开展示阶段', escapeHtml(input.publicStage)],
    ['推荐标签', escapeHtml(input.badgeLabel || '平台审核通过')],
    ['当前进度', `${input.completionRate}%`],
    ['预估支持人数', escapeHtml(String(input.supporterCount))],
    ['剩余时间', `${input.daysLeft} 天`],
    ['支持档位', formatMultilineHtml(supportTiersText)],
    ['最新更新', formatMultilineHtml(latestUpdatesText)],
    ['联系人', escapeHtml(input.contactName)],
    ['联系邮箱', escapeHtml(input.contactEmail)],
    ['联系电话', escapeHtml(input.contactPhone || '未填写')],
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

  const html = `
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

  return sendProjectNotificationMail({
    to: mailTo,
    replyTo: input.contactEmail,
    subject: `[ideatovalue] 新项目申请：${input.projectName}`,
    text,
    html,
  });
}

export async function sendProjectReviewNotificationMail(input: ReviewNotificationInput) {
  const secondaryLabel = getSecondaryLabel(input.projectType, input.projectSubcategory);
  const normalizedNote = input.reviewNote?.trim() || '暂无补充备注';
  const statusLabel = input.status === 'approved' ? '审核通过' : '审核未通过';
  const intro =
    input.status === 'approved'
      ? '你的项目已经通过平台审核，并会按当前配置进入公开展示。'
      : '你的项目本轮未通过平台审核，建议根据审核意见补充后再次提交。';
  const projectLinkText = input.projectUrl ? `项目链接：${input.projectUrl}` : '';

  const text = `你好，${input.recipientName}

你提交到 ideatovalue 的项目已有新的审核结果。

项目名称：${input.projectName}
项目类型：${PROJECT_TYPE_LABELS[input.projectType]}
二级分类：${secondaryLabel}
审核结果：${statusLabel}

${intro}

审核备注：
${normalizedNote}

${projectLinkText}
`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="padding:24px 28px;background:${input.status === 'approved' ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#f59e0b,#ef4444)'};color:#ffffff;">
          <h1 style="margin:0 0 8px;font-size:24px;">${statusLabel}</h1>
          <p style="margin:0;opacity:0.92;">${escapeHtml(input.projectName)}</p>
        </div>
        <div style="padding:24px 28px;line-height:1.9;color:#334155;">
          <p style="margin:0 0 16px;">你好，${escapeHtml(input.recipientName)}。</p>
          <p style="margin:0 0 16px;">${escapeHtml(intro)}</p>
          <p style="margin:0 0 8px;"><strong>项目类型：</strong>${escapeHtml(PROJECT_TYPE_LABELS[input.projectType])}</p>
          <p style="margin:0 0 20px;"><strong>二级分类：</strong>${escapeHtml(secondaryLabel)}</p>
          <div style="padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;">
            <div style="font-weight:600;margin-bottom:8px;">审核备注</div>
            <div>${formatMultilineHtml(normalizedNote)}</div>
          </div>
          ${
            input.projectUrl
              ? `<p style="margin:20px 0 0;"><a href="${escapeHtml(input.projectUrl)}" style="color:#7c3aed;text-decoration:none;font-weight:600;">查看项目详情</a></p>`
              : ''
          }
        </div>
      </div>
    </div>
  `;

  return sendProjectNotificationMail({
    to: input.recipientEmail,
    subject: `[ideatovalue] ${statusLabel}：${input.projectName}`,
    text,
    html,
  });
}
