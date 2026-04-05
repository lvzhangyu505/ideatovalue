import type {
  DiscoveryProgressUpdate,
  DiscoveryProject,
  DiscoverySupportTier,
} from '@/lib/project-discovery';
import { getRecommendedSlugFromBadgeLabel } from '@/lib/project-applications';

export const SUBMISSION_STATUS_VALUES = ['pending', 'approved', 'rejected'] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUS_VALUES)[number];

export type ProjectSubmissionRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_email: string;
  user_name: string;
  project_name: string;
  project_type: string;
  project_subcategory: string;
  description: string;
  goal: string;
  problem: string;
  audience: string;
  solution: string;
  verification: string;
  existing_resources: string;
  needed_resources: string;
  key_risks: string;
  risk_responses: string;
  timeline: string;
  public_stage: string;
  badge_label: string | null;
  completion_rate: number;
  supporter_count: number;
  days_left: number;
  support_tiers: unknown;
  latest_updates: unknown;
  progress_updates: unknown;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  status: SubmissionStatus;
  reviewer_email: string | null;
  review_note: string | null;
  reviewed_at: string | null;
};

export type ProjectProgressUpdateRecord = {
  title: string;
  details: string;
  recordedAt: string;
  completionRate: number;
  supporterCount: number;
  daysLeft: number;
};

const categoryEmojiMap: Record<string, string> = {
  content: '📚',
  product: '🧩',
  service: '🧭',
  community: '👥',
  'public-good': '🌱',
  event: '🎪',
};

export function getSubmissionStatusLabel(status: SubmissionStatus) {
  switch (status) {
    case 'approved':
      return '已通过';
    case 'rejected':
      return '未通过';
    case 'pending':
    default:
      return '审核中';
  }
}

export function splitMultilineText(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function isSupportTier(value: unknown): value is DiscoverySupportTier {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as { amount?: unknown }).amount === 'number' &&
      typeof (value as { description?: unknown }).description === 'string'
  );
}

function isProgressUpdateRecord(value: unknown): value is ProjectProgressUpdateRecord {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as { title?: unknown }).title === 'string' &&
      typeof (value as { details?: unknown }).details === 'string' &&
      typeof (value as { recordedAt?: unknown }).recordedAt === 'string' &&
      typeof (value as { completionRate?: unknown }).completionRate === 'number' &&
      typeof (value as { supporterCount?: unknown }).supporterCount === 'number' &&
      typeof (value as { daysLeft?: unknown }).daysLeft === 'number'
  );
}

export function normalizeSupportTiers(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as DiscoverySupportTier[];
  }

  return value.filter(isSupportTier);
}

export function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function normalizeProgressUpdates(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as ProjectProgressUpdateRecord[];
  }

  return value.filter(isProgressUpdateRecord);
}

export function toPublicProjectId(submissionId: string) {
  return `submission-${submissionId}`;
}

export function fromPublicProjectId(projectId: string) {
  return projectId.startsWith('submission-') ? projectId.slice('submission-'.length) : null;
}

export function mapSubmissionToDiscoveryProject(submission: ProjectSubmissionRecord): DiscoveryProject {
  const normalizedBadgeLabel = submission.badge_label?.trim() || '平台审核通过';
  const normalizedUpdates = normalizeStringArray(submission.latest_updates);
  const normalizedTiers = normalizeSupportTiers(submission.support_tiers);
  const normalizedProgressUpdates = normalizeProgressUpdates(submission.progress_updates);
  const recommendedSlug = getRecommendedSlugFromBadgeLabel(normalizedBadgeLabel);

  return {
    id: toPublicProjectId(submission.id),
    title: submission.project_name,
    description: submission.description,
    longDescription: submission.description,
    whyNow: submission.problem,
    creator: submission.user_name || submission.contact_name,
    primaryCategory: submission.project_type,
    secondaryCategory: submission.project_subcategory,
    stage: submission.status === 'approved' ? submission.public_stage || 'supporting' : 'reviewing',
    badgeLabel: submission.status === 'approved' ? normalizedBadgeLabel : '审核中',
    goal: submission.goal,
    supporters: submission.supporter_count || 0,
    completionRate: submission.completion_rate || 0,
    daysLeft: submission.days_left || 0,
    publishedAt: submission.created_at,
    emoji: categoryEmojiMap[submission.project_type] || '✨',
    recommendations: submission.status === 'approved' && recommendedSlug ? [recommendedSlug] : [],
    tiers: normalizedTiers,
    risks: splitMultilineText(submission.key_risks),
    updates:
      submission.status === 'approved'
        ? normalizedUpdates.length > 0
          ? normalizedUpdates
          : ['项目已通过平台审核，现已公开展示。']
        : ['项目已提交，正在等待平台审核结果。'],
    audience: submission.audience,
    solution: submission.solution,
    verification: submission.verification,
    existingResources: submission.existing_resources,
    neededResources: submission.needed_resources,
    riskResponses: submission.risk_responses,
    timeline: submission.timeline,
    progressUpdates: normalizedProgressUpdates.map(
      (item): DiscoveryProgressUpdate => ({
        title: item.title,
        details: item.details,
        recordedAt: item.recordedAt,
        completionRate: item.completionRate,
        supporterCount: item.supporterCount,
        daysLeft: item.daysLeft,
      })
    ),
  };
}
