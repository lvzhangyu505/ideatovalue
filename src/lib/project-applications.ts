export type ProjectApplicationFormData = {
  projectName: string;
  projectType: string;
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

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  content: '内容型',
  activity: '活动型',
  product: '产品型',
  service: '服务型',
  experiment: '社群实验型',
};

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
