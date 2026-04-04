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

export type DiscoverySupportTier = {
  amount: number;
  description: string;
};

export type DiscoveryProject = {
  id: number | string;
  title: string;
  description: string;
  longDescription: string;
  whyNow: string;
  creator: string;
  primaryCategory: string;
  secondaryCategory: string;
  stage: string;
  badgeLabel: string;
  goal: string;
  supporters: number;
  completionRate: number;
  daysLeft: number;
  publishedAt: string;
  emoji: string;
  recommendations: string[];
  tiers: DiscoverySupportTier[];
  risks: string[];
  updates: string[];
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
    title: '县域青年口述纪录片计划',
    description: '聚焦县域青年的真实处境，用口述影像记录留在县城、返乡创业与流动中的年轻人。',
    longDescription:
      '这是一个聚焦县域青年真实处境的纪录片项目。团队希望用口述影像的方式，记录那些留在县城、返乡创业、准备离开、反复流动的年轻人，呈现他们关于家庭、工作、情感与未来的真实表达。项目不追求宏大叙事，而希望通过具体的人和声音，留下当代县域青年切身可感的生活样本。',
    whyNow:
      '关于青年叙事，互联网常常只看见一线城市与成功故事，但大量县域青年处在更复杂、更真实、也更少被讲述的生活现场。这个项目希望为他们留下一份有温度的公共记录。',
    creator: '林野纪录组',
    primaryCategory: 'content',
    secondaryCategory: 'documentary',
    stage: 'supporting',
    badgeLabel: '观察组推荐',
    goal: '完成 10 位县域青年的口述采访与 1 部中篇纪录片样片',
    supporters: 186,
    completionRate: 64,
    daysLeft: 18,
    publishedAt: '2026-03-26',
    emoji: '🎬',
    recommendations: ['observer'],
    tiers: [
      { amount: 29, description: '感谢支持，获得项目阶段更新邮件' },
      { amount: 99, description: '纪录片抢先观看资格' },
      { amount: 199, description: '观看资格 + 幕后手记电子版' },
      { amount: 399, description: '线上交流放映会席位' },
      { amount: 699, description: '联合共创支持席，名字进入感谢名单' },
    ],
    risks: [
      '采访对象沟通可能影响拍摄节奏',
      '外景拍摄与交通安排可能导致延期',
      '最终成片长度可能根据素材情况调整',
    ],
    updates: [
      '已完成 6 位采访对象初步确认',
      '已完成 3 位人物正式拍摄',
      '正在补充县域返乡创业样本人物',
    ],
  },
  {
    id: 2,
    title: '乡村学校流动科学课',
    description: '把可移动、低门槛、可操作的小型科学实验课程带进乡村学校。',
    longDescription:
      '这是一个面向乡村学校的流动科学课项目。团队将设计可移动、低门槛、可操作的小型科学实验课程，把基础科学体验带进乡村学校，让孩子在观察、动手与提问中建立对科学的兴趣。',
    whyNow:
      '不少乡村学校具备基础教学条件，但在实验体验、互动课程和外部科学教育资源上仍较有限。这个项目希望补上这一段“能让孩子真正动手”的教育体验。',
    creator: '流动科学课堂小组',
    primaryCategory: 'public-good',
    secondaryCategory: 'education-impact',
    stage: 'executing',
    badgeLabel: '已通过初审',
    goal: '进入 5 所乡村学校，完成 20 节流动科学课',
    supporters: 243,
    completionRate: 82,
    daysLeft: 9,
    publishedAt: '2026-03-28',
    emoji: '🔬',
    recommendations: [],
    tiers: [
      { amount: 19, description: '支持一份实验材料包' },
      { amount: 69, description: '支持一节课的基础耗材' },
      { amount: 199, description: '支持一名学生完整参与一轮课程' },
      { amount: 599, description: '支持一所学校 1 次流动科学课' },
      { amount: 999, description: '成为联合支持伙伴，获得阶段执行报告' },
    ],
    risks: [
      '校方时间安排可能产生变动',
      '偏远地区交通会影响课程执行频率',
      '实验材料需根据实际安全条件调整',
    ],
    updates: [
      '已完成 3 所学校对接',
      '已执行 12 节课程',
      '第二批实验材料已采购完成',
    ],
  },
  {
    id: 3,
    title: '旧衣再造文创实验室',
    description: '把旧衣物转化为有审美、有故事、有再使用价值的文创产品。',
    longDescription:
      '项目尝试把旧衣物从“待处理废弃物”转化为“有审美、有故事、有再使用价值”的文创产品。第一期计划从帆布包、布面笔袋和拼接小挂件三个方向切入，探索环保与设计的结合。',
    whyNow:
      '大量旧衣最终去向并不透明，而再造不应该只是口号。项目希望用真实产品验证：旧衣可以不是负担，也可以成为新设计的起点。',
    creator: '再造实验室',
    primaryCategory: 'product',
    secondaryCategory: 'cultural-creative',
    stage: 'supporting',
    badgeLabel: '逻辑闭环完成',
    goal: '打样 3 款旧衣再造文创产品并完成首轮小批量制作',
    supporters: 128,
    completionRate: 57,
    daysLeft: 21,
    publishedAt: '2026-03-20',
    emoji: '🧵',
    recommendations: ['completion'],
    tiers: [
      { amount: 29, description: '环保支持档' },
      { amount: 99, description: '再造挂件 1 个' },
      { amount: 159, description: '拼接布袋 1 个' },
      { amount: 259, description: '笔袋 + 挂件组合' },
      { amount: 399, description: '实验室共创支持席' },
    ],
    risks: [
      '原材料来源差异会影响产品统一性',
      '小批量手工制作时间较长',
      '首轮产品可能需要根据实际反馈微调',
    ],
    updates: [
      '已完成 2 款样品打样',
      '回收旧衣分类规则已确定',
      '正在测试不同材质拼接工艺',
    ],
  },
  {
    id: 4,
    title: '城市共学地图',
    description: '连接城市里分散存在的共学空间、主题社群与长期学习点位。',
    longDescription:
      '城市共学地图希望把城市中分散存在的共学空间、主题社群、线下知识活动和长期学习点位连接起来，让愿意学习、组织、共创的人更容易彼此发现。',
    whyNow:
      '很多城市并不缺学习活动，缺的是一个被整理、被看见、被持续维护的连接入口。这个项目希望成为这种入口。',
    creator: '共学城市计划',
    primaryCategory: 'community',
    secondaryCategory: 'co-learning',
    stage: 'reviewing',
    badgeLabel: '共创指导位',
    goal: '梳理并上线首批 50 个城市共学点位',
    supporters: 67,
    completionRate: 35,
    daysLeft: 26,
    publishedAt: '2026-03-23',
    emoji: '🗺️',
    recommendations: [],
    tiers: [
      { amount: 19, description: '地图支持档' },
      { amount: 59, description: '首发内测资格' },
      { amount: 129, description: '首批共学点位推荐资格' },
      { amount: 299, description: '城市共学共创席位' },
      { amount: 599, description: '联合发起支持档' },
    ],
    risks: [
      '点位信息持续维护成本较高',
      '不同城市的数据密度差异较大',
      '初版地图可能优先覆盖少数城市',
    ],
    updates: [
      '正在完善项目逻辑与城市样本采集方法',
      '已进入平台共创指导阶段',
      '首批测试城市拟定为苏州、南京、杭州',
    ],
  },
  {
    id: 5,
    title: '独立创作者 AI 写作助手',
    description: '为独立创作者完成选题梳理、提纲拆解、逻辑优化和表达润色的 AI 工具。',
    longDescription:
      '这是一个为独立创作者设计的 AI 写作助手。它不是简单替代写作，而是帮助创作者完成选题梳理、提纲拆解、逻辑优化、表达润色和内容结构建议。',
    whyNow:
      '很多创作者不是没有表达，而是经常卡在“想法很多但写不出来”“能写但结构混乱”。项目想做的是一个真正理解创作者工作流的工具。',
    creator: '写作协作实验组',
    primaryCategory: 'product',
    secondaryCategory: 'ai-product',
    stage: 'supporting',
    badgeLabel: '本周推荐',
    goal: '完成最小可用版本，并开放首批 100 名创作者测试',
    supporters: 214,
    completionRate: 73,
    daysLeft: 12,
    publishedAt: '2026-04-03',
    emoji: '🤖',
    recommendations: ['weekly'],
    tiers: [
      { amount: 19, description: '支持开发' },
      { amount: 79, description: '首轮测试资格' },
      { amount: 149, description: '内测资格 + 反馈群' },
      { amount: 299, description: '深度体验席位' },
      { amount: 599, description: '联合共创测试席位' },
    ],
    risks: [
      '模型效果需根据真实用户反馈持续迭代',
      '不同创作类型对工具需求差异较大',
      '首版可能先聚焦图文写作场景',
    ],
    updates: [
      '已完成 MVP 核心功能设计',
      '首轮创作者测试名单开始招募',
      '正在优化“选题拆解 + 结构建议”模块',
    ],
  },
  {
    id: 6,
    title: '月度城市徒步净街计划',
    description: '把城市徒步和公共环保行动结合起来，用低门槛方式持续发起净街行动。',
    longDescription:
      '这是一个将“城市徒步 + 公共环保行动”结合起来的长期项目。每个月发起一次固定主题的徒步捡垃圾活动，用低门槛、可重复的方式，让环保从抽象理念变成真实参与。',
    whyNow:
      '很多人认同环保，但不知道如何开始。这个项目希望提供一个足够轻、足够具体的参与入口：一起走路，一起捡起被忽视的垃圾，一起重新看见城市。',
    creator: '城市微行动小组',
    primaryCategory: 'public-good',
    secondaryCategory: 'environment-action',
    stage: 'supporting',
    badgeLabel: '新上线',
    goal: '连续 6 个月，每月组织 1 次徒步净街行动',
    supporters: 92,
    completionRate: 41,
    daysLeft: 24,
    publishedAt: '2026-04-02',
    emoji: '🚶',
    recommendations: ['new'],
    tiers: [
      { amount: 9.9, description: '环保行动支持档' },
      { amount: 39, description: '净街行动物资支持档' },
      { amount: 79, description: '线下参与席位' },
      { amount: 129, description: '月度行动共创席' },
      { amount: 299, description: '连续 3 期联合支持档' },
    ],
    risks: [
      '天气变化可能导致活动时间调整',
      '不同片区的参与人数可能不均衡',
      '活动执行依赖志愿协调与现场管理',
    ],
    updates: [
      '首月路线已完成踩点',
      '已确定基础物资采购清单',
      '正在招募第一批志愿协作者',
    ],
  },
  {
    id: 7,
    title: 'Color Walk 城市色彩漫游展',
    description: '用 color walk 漫游活动重新发现城市，并最终形成一场公共展览。',
    longDescription:
      'Color Walk 是一个关于“重新发现城市”的展览型活动项目。参与者将随机抽取一种颜色，沿着既定路线在城市中寻找与记录属于这种颜色的物件、空间与瞬间，并最终共同构成一场公共展示。',
    whyNow:
      '日常城市生活中有大量被忽略的细节。Color Walk 想把“散步”变成一种更有感知的公共体验，让人重新看到那些原本不会停下来的颜色、物件和关系。',
    creator: '城市漫游实验组',
    primaryCategory: 'event',
    secondaryCategory: 'exhibition',
    stage: 'supporting',
    badgeLabel: '编辑精选',
    goal: '发起 3 场线下 color walk 漫游活动，并形成一场公共展览',
    supporters: 157,
    completionRate: 68,
    daysLeft: 15,
    publishedAt: '2026-03-31',
    emoji: '🎨',
    recommendations: [],
    tiers: [
      { amount: 19, description: '展览支持档' },
      { amount: 59, description: '单场 color walk 参与资格' },
      { amount: 129, description: '参与资格 + 纪念手册' },
      { amount: 199, description: '双人同行席位' },
      { amount: 399, description: '联合共创支持席位' },
    ],
    risks: [
      '天气会影响线下路线体验',
      '展览呈现形式可能根据参与素材质量调整',
      '不同城市空间开放条件存在差异',
    ],
    updates: [
      '已完成首条蓝色主题路线设计',
      '正在招募首批参与者与志愿摄影记录者',
      '展览空间正在接洽中',
    ],
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

export function getDiscoveryProjectById(projectId: number | string) {
  return discoveryProjects.find((project) => String(project.id) === String(projectId));
}
