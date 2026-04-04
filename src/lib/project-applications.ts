import { discoveryCategories, discoveryProjectStages, discoveryRecommendedViews } from '@/lib/project-discovery';

export type ProjectApplicationFormData = {
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
  completionRate: string;
  supporterCount: string;
  daysLeft: string;
  supportTiers: string;
  latestUpdates: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export type StoredProjectApplication = ProjectApplicationFormData & {
  id: string;
  createdAt: string;
  ownerEmail: string;
  ownerName: string;
  reviewStatus: '已提交';
};

export const PROJECT_APPLICATION_STORAGE_KEY = 'ideatovalue.project-applications';

export const PROJECT_TYPE_VALUES = [
  'content',
  'product',
  'service',
  'community',
  'public-good',
  'event',
] as const;

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  content: '内容型',
  product: '产品型',
  service: '服务型',
  community: '社群型',
  'public-good': '公益型',
  event: '活动型',
};

export const PROJECT_TYPE_OPTIONS = discoveryCategories.map((category) => ({
  value: category.slug,
  label: category.label,
}));

export const PROJECT_PUBLIC_STAGE_OPTIONS = discoveryProjectStages.filter(
  (stage) => stage.slug !== 'applying' && stage.slug !== 'reviewing'
);

export const PROJECT_BADGE_OPTIONS = [
  ...discoveryRecommendedViews.map((view) => ({
    value: view.label,
    label: view.label,
  })),
  { value: '共创指导位', label: '共创指导位' },
  { value: '逻辑闭环完成', label: '逻辑闭环完成' },
  { value: '已通过初审', label: '已通过初审' },
  { value: '编辑精选', label: '编辑精选' },
  { value: '平台审核通过', label: '平台审核通过' },
];

export function getProjectSubcategoryOptions(projectType: string) {
  return (
    discoveryCategories
      .find((category) => category.slug === projectType)
      ?.secondaryCategories.map((category) => ({
        value: category.slug,
        label: category.label,
      })) ?? []
  );
}

export function getRecommendedSlugFromBadgeLabel(badgeLabel: string) {
  return discoveryRecommendedViews.find((view) => view.label === badgeLabel)?.slug ?? null;
}

export function getStoredProjectApplications(ownerEmail?: string | null) {
  if (typeof window === 'undefined') {
    return [] as StoredProjectApplication[];
  }

  try {
    const rawValue = window.localStorage.getItem(PROJECT_APPLICATION_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const items = JSON.parse(rawValue) as StoredProjectApplication[];
    const normalizedEmail = ownerEmail?.trim().toLowerCase();

    return items
      .filter((item) => !normalizedEmail || item.ownerEmail === normalizedEmail)
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  } catch (error) {
    console.error('读取本地项目申请记录失败:', error);
    return [];
  }
}

export function saveProjectApplication(
  data: ProjectApplicationFormData,
  options: {
    ownerEmail?: string | null;
    ownerName?: string | null;
  }
) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextRecord: StoredProjectApplication = {
    ...data,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    ownerEmail: options.ownerEmail?.trim().toLowerCase() || data.contactEmail.trim().toLowerCase(),
    ownerName: options.ownerName?.trim() || data.contactName.trim(),
    reviewStatus: '已提交',
  };

  try {
    const currentItems = getStoredProjectApplications();
    window.localStorage.setItem(
      PROJECT_APPLICATION_STORAGE_KEY,
      JSON.stringify([nextRecord, ...currentItems])
    );
  } catch (error) {
    console.error('保存本地项目申请记录失败:', error);
  }
}
