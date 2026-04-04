import type { DiscoveryProject } from '@/lib/project-discovery';

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
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  status: SubmissionStatus;
  reviewer_email: string | null;
  review_note: string | null;
  reviewed_at: string | null;
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

export function toPublicProjectId(submissionId: string) {
  return `submission-${submissionId}`;
}

export function fromPublicProjectId(projectId: string) {
  return projectId.startsWith('submission-') ? projectId.slice('submission-'.length) : null;
}

export function mapSubmissionToDiscoveryProject(submission: ProjectSubmissionRecord): DiscoveryProject {
  return {
    id: toPublicProjectId(submission.id),
    title: submission.project_name,
    description: submission.description,
    longDescription: submission.description,
    whyNow: submission.problem,
    creator: submission.user_name || submission.contact_name,
    primaryCategory: submission.project_type,
    secondaryCategory: submission.project_subcategory,
    stage: submission.status === 'approved' ? 'supporting' : 'reviewing',
    badgeLabel: submission.status === 'approved' ? '已通过审核' : '审核中',
    goal: submission.goal,
    supporters: 0,
    completionRate: 0,
    daysLeft: 30,
    publishedAt: submission.created_at,
    emoji: categoryEmojiMap[submission.project_type] || '✨',
    recommendations: submission.status === 'approved' ? ['new'] : [],
    tiers: [],
    risks: splitMultilineText(submission.key_risks),
    updates:
      submission.status === 'approved'
        ? ['项目已通过平台审核，现已公开展示。']
        : ['项目已提交，正在等待平台审核结果。'],
  };
}
