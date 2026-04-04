export type DiscoverySecondaryCategory = {
  slug: string;
  label: string;
};

export type DiscoveryPrimaryCategory = {
  slug: string;
  label: string;
  description: string;
  secondaryCategories: DiscoverySecondaryCategory[];
};

export type DiscoveryRecommendedView = {
  slug: string;
  label: string;
  description: string;
};

export type DiscoveryProjectStage = {
  slug: string;
  label: string;
};

export type DiscoveryProject = {
  id: number;
  title: string;
  description: string;
  creator: string;
  primaryCategory: string;
  secondaryCategory: string;
  stage: string;
  supporters: number;
  completionRate: number;
  daysLeft: number;
  publishedAt: string;
  emoji: string;
  recommendations: string[];
};

export const discoveryCategories: DiscoveryPrimaryCategory[] = [
  {
    slug: 'content',
    label: '内容型',
    description: '把经验、观察和观点沉淀成可传播、可复用、可持续更新的内容资产。',
    secondaryCategories: [
      { slug: 'course', label: '课程' },
      { slug: 'documentary', label: '纪录片' },
      { slug: 'column', label: '图文专栏' },
      { slug: 'podcast', label: '播客' },
      { slug: 'ebook', label: '电子书' },
      { slug: 'publishing', label: '出版计划' },
      { slug: 'media-program', label: '自媒体栏目' },
    ],
  },
  {
    slug: 'product',
    label: '产品型',
    description: '围绕工具、原型与实物产品展开，从概念验证走向真实交付。',
    secondaryCategories: [
      { slug: 'digital-tool', label: '数字工具' },
      { slug: 'ai-product', label: 'AI 产品' },
      { slug: 'daily-goods', label: '生活用品' },
      { slug: 'cultural-creative', label: '文创周边' },
      { slug: 'education-tool', label: '教育工具' },
      { slug: 'experimental-product', label: '实验产品' },
      { slug: 'prototype-validation', label: '原型验证' },
    ],
  },
  {
    slug: 'service',
    label: '服务型',
    description: '用系统化的方法和陪伴式交付，帮助用户在真实场景里得到改善。',
    secondaryCategories: [
      { slug: 'consulting-service', label: '顾问服务' },
      { slug: 'community-service', label: '社群服务' },
      { slug: 'coaching-program', label: '陪跑计划' },
      { slug: 'bootcamp', label: '训练营' },
      { slug: 'consulting-project', label: '咨询项目' },
      { slug: 'coach-service', label: '教练服务' },
      { slug: 'offline-support', label: '线下陪伴' },
    ],
  },
  {
    slug: 'community',
    label: '社群型',
    description: '以成员连接、主题组织和持续互动为核心，建立真实关系与共同实践。',
    secondaryCategories: [
      { slug: 'co-learning', label: '共学计划' },
      { slug: 'city-event', label: '城市活动' },
      { slug: 'theme-community', label: '主题社群' },
      { slug: 'co-branding', label: '联名共创' },
      { slug: 'community-experiment', label: '社群实验' },
      { slug: 'member-recruitment', label: '成员招募' },
      { slug: 'community-building', label: '社区建设' },
    ],
  },
  {
    slug: 'public-good',
    label: '公益型',
    description: '面向公共价值与长期议题，让资源和行动流向更值得被支持的人与地方。',
    secondaryCategories: [
      { slug: 'education-impact', label: '教育公益' },
      { slug: 'rural-project', label: '乡村项目' },
      { slug: 'environment-action', label: '环保行动' },
      { slug: 'community-renewal', label: '社区更新' },
      { slug: 'youth-support', label: '青少年支持' },
      { slug: 'public-issue', label: '公共议题' },
      { slug: 'nonprofit-lab', label: '非营利实验' },
    ],
  },
  {
    slug: 'event',
    label: '活动型',
    description: '通过线下体验和集中触达形成影响，让观点、产品和人与人真正相遇。',
    secondaryCategories: [
      { slug: 'workshop', label: '工作坊' },
      { slug: 'exhibition', label: '展览' },
      { slug: 'salon', label: '沙龙' },
      { slug: 'roadshow', label: '路演' },
      { slug: 'training-event', label: '训练活动' },
      { slug: 'launch-event', label: '发布会' },
      { slug: 'offline-experience', label: '线下体验' },
    ],
  },
];

export const discoveryRecommendedViews: DiscoveryRecommendedView[] = [
  { slug: 'weekly', label: '本周推荐', description: '编辑与观察组联合挑出的高潜力项目。' },
  { slug: 'new', label: '刚上线', description: '最近发布，值得第一时间关注。' },
  { slug: 'ending', label: '即将截止', description: '剩余时间不多，适合快速决策。' },
  { slug: 'completion', label: '高完成度', description: '执行扎实，推进节奏清晰稳定。' },
  { slug: 'observer', label: '观察组推荐', description: '已有观察组持续跟踪的重点项目。' },
  { slug: 'review', label: '复盘案例', description: '适合研究方法论与交付闭环的案例。' },
];

export const discoveryProjectStages: DiscoveryProjectStage[] = [
  { slug: 'applying', label: '申请中' },
  { slug: 'reviewing', label: '审核中' },
  { slug: 'supporting', label: '支持中' },
  { slug: 'executing', label: '执行中' },
  { slug: 'reviewing-results', label: '复盘中' },
  { slug: 'completed', label: '已完成' },
];

export const discoveryProjects: DiscoveryProject[] = [
  {
    id: 1,
    title: '独立创作者 AI 写作助手',
    description: '面向知识创作者的 AI 写作工具，帮助完成选题拆解、结构搭建与长文润色。',
    creator: '陈晨',
    primaryCategory: 'product',
    secondaryCategory: 'ai-product',
    stage: 'supporting',
    supporters: 186,
    completionRate: 74,
    daysLeft: 10,
    publishedAt: '2026-03-28',
    emoji: '🤖',
    recommendations: ['weekly', 'completion'],
  },
  {
    id: 2,
    title: '县域青年口述纪录片计划',
    description: '以 12 个县域样本记录返乡青年的真实故事，形成影片与图文专题双版本交付。',
    creator: '林夏',
    primaryCategory: 'content',
    secondaryCategory: 'documentary',
    stage: 'reviewing',
    supporters: 63,
    completionRate: 26,
    daysLeft: 18,
    publishedAt: '2026-03-25',
    emoji: '🎬',
    recommendations: ['observer'],
  },
  {
    id: 3,
    title: '城市共学地图',
    description: '把不同城市的共学活动、发起人和可参与空间整合成可持续更新的主题社群地图。',
    creator: '赵青',
    primaryCategory: 'community',
    secondaryCategory: 'co-learning',
    stage: 'executing',
    supporters: 142,
    completionRate: 81,
    daysLeft: 6,
    publishedAt: '2026-03-16',
    emoji: '🗺️',
    recommendations: ['weekly', 'observer', 'ending'],
  },
  {
    id: 4,
    title: '青年职业叙事训练营',
    description: '帮助 20 位青年完成职业故事梳理、表达训练与项目路演的陪跑式服务。',
    creator: '苏禾',
    primaryCategory: 'service',
    secondaryCategory: 'bootcamp',
    stage: 'supporting',
    supporters: 98,
    completionRate: 61,
    daysLeft: 14,
    publishedAt: '2026-03-30',
    emoji: '🏕️',
    recommendations: ['new'],
  },
  {
    id: 5,
    title: '旧衣再造文创实验室',
    description: '把社区回收旧衣改造成限量文创周边，并同步开放设计过程和供应链复盘。',
    creator: '吴敏',
    primaryCategory: 'product',
    secondaryCategory: 'cultural-creative',
    stage: 'reviewing-results',
    supporters: 205,
    completionRate: 92,
    daysLeft: 0,
    publishedAt: '2026-02-18',
    emoji: '🧵',
    recommendations: ['completion', 'review'],
  },
  {
    id: 6,
    title: '乡村学校流动科学课',
    description: '为乡村学校设计可复制的科学实验课程包，配套教师手册和志愿者培训。',
    creator: '周岚',
    primaryCategory: 'public-good',
    secondaryCategory: 'education-impact',
    stage: 'supporting',
    supporters: 174,
    completionRate: 68,
    daysLeft: 9,
    publishedAt: '2026-03-22',
    emoji: '🔬',
    recommendations: ['weekly'],
  },
  {
    id: 7,
    title: '创作者深度播客栏目',
    description: '持续访谈独立创作者的项目方法、资金结构与执行细节，形成音频和精华图文专栏。',
    creator: '何野',
    primaryCategory: 'content',
    secondaryCategory: 'podcast',
    stage: 'applying',
    supporters: 39,
    completionRate: 14,
    daysLeft: 21,
    publishedAt: '2026-04-02',
    emoji: '🎙️',
    recommendations: ['new'],
  },
  {
    id: 8,
    title: '社区厨房周末工作坊',
    description: '把社区公共厨房做成常态化工作坊，用一顿饭连接附近居民与在地品牌。',
    creator: '周婷',
    primaryCategory: 'event',
    secondaryCategory: 'workshop',
    stage: 'executing',
    supporters: 117,
    completionRate: 76,
    daysLeft: 5,
    publishedAt: '2026-03-12',
    emoji: '🍲',
    recommendations: ['ending', 'observer'],
  },
  {
    id: 9,
    title: '亲子阅读图文专栏',
    description: '为家长整理高质量亲子阅读路径，每周固定更新书单、提问方法和陪伴案例。',
    creator: '周梨',
    primaryCategory: 'content',
    secondaryCategory: 'column',
    stage: 'completed',
    supporters: 132,
    completionRate: 100,
    daysLeft: 0,
    publishedAt: '2026-01-30',
    emoji: '📚',
    recommendations: ['completion', 'review'],
  },
  {
    id: 10,
    title: '非营利议题可视化实验',
    description: '把复杂公共议题做成更容易传播的数据图解和线下分享内容，帮助公众理解问题。',
    creator: '顾一',
    primaryCategory: 'public-good',
    secondaryCategory: 'public-issue',
    stage: 'reviewing',
    supporters: 84,
    completionRate: 33,
    daysLeft: 16,
    publishedAt: '2026-03-21',
    emoji: '📊',
    recommendations: ['observer'],
  },
  {
    id: 11,
    title: 'AI 家庭作业反馈器',
    description: '给家长和老师提供更细颗粒度的学习反馈，先做小样本验证再考虑扩展。',
    creator: '刘远',
    primaryCategory: 'product',
    secondaryCategory: 'education-tool',
    stage: 'applying',
    supporters: 28,
    completionRate: 12,
    daysLeft: 24,
    publishedAt: '2026-04-01',
    emoji: '🧠',
    recommendations: ['new'],
  },
  {
    id: 12,
    title: '社群发起人陪跑计划',
    description: '为第一次发起项目的社群成员提供 6 周陪跑、目标拆解和更新机制辅导。',
    creator: '罗真',
    primaryCategory: 'service',
    secondaryCategory: 'coaching-program',
    stage: 'supporting',
    supporters: 143,
    completionRate: 57,
    daysLeft: 11,
    publishedAt: '2026-03-19',
    emoji: '🧭',
    recommendations: ['weekly'],
  },
  {
    id: 13,
    title: '城市慢闪展览计划',
    description: '围绕在地职业与手工劳动主题，发起一次可在多个城市巡回的小型展览。',
    creator: '沈木',
    primaryCategory: 'event',
    secondaryCategory: 'exhibition',
    stage: 'reviewing',
    supporters: 76,
    completionRate: 37,
    daysLeft: 19,
    publishedAt: '2026-03-24',
    emoji: '🖼️',
    recommendations: [],
  },
  {
    id: 14,
    title: '青年社区建设员招募',
    description: '招募愿意一起运营线下社区空间的成员，测试城市轻组织的协作方法。',
    creator: '唐陌',
    primaryCategory: 'community',
    secondaryCategory: 'member-recruitment',
    stage: 'supporting',
    supporters: 91,
    completionRate: 49,
    daysLeft: 8,
    publishedAt: '2026-03-27',
    emoji: '🏘️',
    recommendations: ['ending'],
  },
  {
    id: 15,
    title: '新手播客发布会',
    description: '帮助第一次做播客的人完成线下发布、现场共听和选题交流。',
    creator: '白溪',
    primaryCategory: 'event',
    secondaryCategory: 'launch-event',
    stage: 'completed',
    supporters: 64,
    completionRate: 100,
    daysLeft: 0,
    publishedAt: '2026-02-12',
    emoji: '🎤',
    recommendations: ['review'],
  },
];

export function buildDiscoveryHref(filters: {
  primary?: string;
  secondary?: string;
  stage?: string;
  sort?: string;
  view?: string;
}) {
  const searchParams = new URLSearchParams();

  if (filters.primary) {
    searchParams.set('primary', filters.primary);
  }

  if (filters.secondary) {
    searchParams.set('secondary', filters.secondary);
  }

  if (filters.stage) {
    searchParams.set('stage', filters.stage);
  }

  if (filters.sort) {
    searchParams.set('sort', filters.sort);
  }

  if (filters.view) {
    searchParams.set('view', filters.view);
  }

  const query = searchParams.toString();
  return query ? `/projects?${query}` : '/projects';
}

export function getDiscoveryCategory(categorySlug: string) {
  return discoveryCategories.find((category) => category.slug === categorySlug);
}

export function getDiscoveryStageLabel(stageSlug: string) {
  return discoveryProjectStages.find((stage) => stage.slug === stageSlug)?.label ?? stageSlug;
}

export function getSecondaryCategoryLabel(primarySlug: string, secondarySlug: string) {
  return (
    getDiscoveryCategory(primarySlug)?.secondaryCategories.find((secondary) => secondary.slug === secondarySlug)?.label ??
    secondarySlug
  );
}
