'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuthActions } from '@/components/auth-actions';
import { useAuthUser } from '@/hooks/use-auth-user';
import {
  type ProjectApplicationFormData,
  PROJECT_BADGE_OPTIONS,
  PROJECT_PUBLIC_STAGE_OPTIONS,
  getProjectSubcategoryOptions,
  PROJECT_TYPE_LABELS,
  PROJECT_TYPE_OPTIONS,
} from '@/lib/project-applications';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { 
  Rocket, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';

const initialFormData: ProjectApplicationFormData = {
  // 第一步：基本信息
  projectName: '',
  projectType: '',
  projectSubcategory: '',
  description: '',
  
  // 项目逻辑
  goal: '',
  problem: '',
  audience: '',
  solution: '',
  verification: '',
  
  // 资源与风险
  existingResources: '',
  neededResources: '',
  keyRisks: '',
  riskResponses: '',
  
  // 时间安排
  timeline: '',
  publicStage: 'supporting',
  badgeLabel: '平台审核通过',
  completionRate: '0',
  supporterCount: '0',
  daysLeft: '30',
  supportTiers: '',
  latestUpdates: '',
  
  // 联系方式
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

const requiredFieldLabels: Array<[keyof typeof initialFormData, string]> = [
  ['projectName', '项目名称'],
  ['projectType', '项目类型'],
  ['projectSubcategory', '二级分类'],
  ['description', '项目简介'],
  ['goal', '项目目标'],
  ['problem', '要解决的问题'],
  ['audience', '面向对象/受众'],
  ['solution', '方案路径'],
  ['verification', '验证标准'],
  ['existingResources', '当前已有资源'],
  ['neededResources', '当前仍需支持'],
  ['keyRisks', '关键风险'],
  ['riskResponses', '应对思路'],
  ['timeline', '初步时间安排'],
  ['publicStage', '公开展示阶段'],
  ['contactName', '联系人姓名'],
  ['contactEmail', '联系邮箱'],
];

const requiredFieldStepMap: Record<keyof typeof initialFormData, number> = {
  projectName: 1,
  projectType: 1,
  projectSubcategory: 1,
  description: 1,
  goal: 2,
  problem: 2,
  audience: 2,
  solution: 2,
  verification: 2,
  existingResources: 3,
  neededResources: 3,
  keyRisks: 3,
  riskResponses: 3,
  timeline: 4,
  publicStage: 4,
  badgeLabel: 4,
  completionRate: 4,
  supporterCount: 4,
  daysLeft: 4,
  supportTiers: 4,
  latestUpdates: 4,
  contactName: 5,
  contactEmail: 5,
  contactPhone: 5,
};

export default function StartProjectPage() {
  const { user } = useAuthUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingFocusField, setPendingFocusField] = useState<keyof typeof initialFormData | ''>('');
  const totalSteps = 6;

  // 表单数据状态
  const [formData, setFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subcategoryOptions = useMemo(
    () => getProjectSubcategoryOptions(formData.projectType),
    [formData.projectType]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    const displayName =
      typeof user.user_metadata.display_name === 'string' && user.user_metadata.display_name.trim()
        ? user.user_metadata.display_name.trim()
        : '';

    setFormData((current) => ({
      ...current,
      contactName: current.contactName || displayName,
      contactEmail: current.contactEmail || user.email || '',
    }));
  }, [user]);

  useEffect(() => {
    if (!pendingFocusField) {
      return;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(pendingFocusField);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target?.focus();
      setPendingFocusField('');
    }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentStep, pendingFocusField]);

  const steps = [
    { id: 1, title: '基本信息', icon: FileText },
    { id: 2, title: '项目逻辑', icon: Target },
    { id: 3, title: '资源风险', icon: AlertCircle },
    { id: 4, title: '时间安排', icon: Clock },
    { id: 5, title: '联系方式', icon: TrendingUp },
    { id: 6, title: '确认提交', icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitSuccess('');

    if (!user) {
      setSubmitError('请先登录，再提交项目申请。');
      return;
    }

    const missingFields = requiredFieldLabels
      .filter(([field]) => !formData[field].trim())
      .map(([field, label]) => ({ field, label }));

    if (missingFields.length > 0) {
      const firstMissingField = missingFields[0];
      setCurrentStep(requiredFieldStepMap[firstMissingField.field]);
      setPendingFocusField(firstMissingField.field);
      setSubmitError(`还有未填写的必填项：${missingFields.map((item) => item.label).join('、')}。`);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())) {
      setCurrentStep(requiredFieldStepMap.contactEmail);
      setPendingFocusField('contactEmail');
      setSubmitError('请填写正确的联系邮箱。');
      return;
    }

    if (Number.parseInt(formData.completionRate || '0', 10) < 0 || Number.parseInt(formData.completionRate || '0', 10) > 100) {
      setCurrentStep(requiredFieldStepMap.completionRate);
      setPendingFocusField('completionRate');
      setSubmitError('当前进度需要填写 0 到 100 之间的整数。');
      return;
    }

    if (Number.parseInt(formData.supporterCount || '0', 10) < 0 || Number.parseInt(formData.daysLeft || '0', 10) < 0) {
      setCurrentStep(requiredFieldStepMap.supporterCount);
      setPendingFocusField('supporterCount');
      setSubmitError('预估支持人数和剩余时间不能为负数。');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { session },
      } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

      if (!session?.access_token) {
        setSubmitError('当前登录状态已失效，请重新登录后再提交。');
        return;
      }

      const response = await fetch('/api/project-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmitError(result.message || '提交失败，请稍后重试。');
        return;
      }
      setSubmitSuccess('项目申请已提交成功，已进入平台审核队列。');
    } catch (error) {
      console.error('提交项目申请失败:', error);
      setSubmitError('提交失败，当前网络或邮件服务可能暂时不可用，请稍后再试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
      {/* 顶部导航栏 - 居中分散布局 */}
      <header className="sticky top-0 z-50 border-b border-purple-100/50 dark:border-purple-900/30 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* 左侧品牌 */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* 双液态圆Logo */}
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full opacity-90 blur-[2px]"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 rounded-full"></div>
                <div className="absolute inset-2 bg-white/40 dark:bg-white/20 backdrop-blur-sm rounded-full"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                共创平台
              </span>
            </Link>
            
            {/* 中间导航 - 居中分散 */}
            <nav className="hidden md:flex items-center gap-10 lg:gap-16 flex-1 justify-center">
              <Link href="/projects" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                发现项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                平台介绍
              </Link>
            </nav>

            {/* 右侧操作区 */}
            <AuthActions />
          </div>
        </div>
      </header>

      {/* 返回导航 */}
      <div className="border-b border-purple-100/50 dark:border-purple-900/30 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-12 py-3">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </div>

      {/* 页面标题 */}
      <section className="border-b border-purple-100/50 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 dark:from-slate-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
            发起共创项目
          </h1>
          <p className="text-slate-600 dark:text-slate-400">完善项目信息，经过审核后获得社群支持</p>
        </div>
      </section>

      {/* 步骤进度条 */}
      <section className="border-b border-purple-100/50 dark:border-purple-900/30 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 scale-110' 
                        : isCompleted 
                          ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-500/25' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-2 transition-all ${
                      isActive ? 'font-semibold text-purple-600 dark:text-purple-400' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {step.id < totalSteps && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      isCompleted ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-slate-200 dark:bg-slate-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>
      </section>

      {/* 表单内容 */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 shadow-2xl shadow-purple-500/10 rounded-2xl">
            <CardHeader className="border-b border-purple-100/50 dark:border-purple-900/30">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  {(() => {
                    const StepIcon = steps[currentStep - 1].icon;
                    return <StepIcon className="h-4 w-4 text-purple-500" />;
                  })()}
                </div>
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                步骤 {currentStep} / {totalSteps}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 第一步：基本信息 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">项目名称 *</Label>
                    <Input
                      id="projectName"
                      placeholder="请输入项目名称"
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectType">项目类型 *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          projectType: value,
                          projectSubcategory: '',
                        })
                      }
                    >
                      <SelectTrigger id="projectType">
                        <SelectValue placeholder="请选择项目类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="projectSubcategory">二级分类 *</Label>
                    <Select
                      value={formData.projectSubcategory}
                      onValueChange={(value) => setFormData({...formData, projectSubcategory: value})}
                      disabled={!formData.projectType}
                    >
                      <SelectTrigger id="projectSubcategory">
                        <SelectValue placeholder={formData.projectType ? '请选择二级分类' : '请先选择项目类型'} />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">项目简介 *</Label>
                    <Textarea
                      id="description"
                      placeholder="请用一句话描述你的项目（不超过50字）"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>提示：</strong>项目名称要简洁明了，简介要抓住核心价值，这会直接影响用户对项目的第一印象。
                    </p>
                  </div>
                </div>
              )}

              {/* 第二步：项目逻辑 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal">项目目标 *</Label>
                    <Textarea
                      id="goal"
                      placeholder="你希望达成什么目标？项目完成后的理想状态是什么？"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="problem">要解决的问题 *</Label>
                    <Textarea
                      id="problem"
                      placeholder="你的项目解决什么具体问题？为什么这个问题值得解决？"
                      value={formData.problem}
                      onChange={(e) => setFormData({...formData, problem: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="audience">面向对象/受众 *</Label>
                    <Textarea
                      id="audience"
                      placeholder="谁会从你的项目中受益？你的目标用户是谁？"
                      value={formData.audience}
                      onChange={(e) => setFormData({...formData, audience: e.target.value})}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="solution">方案路径 *</Label>
                    <Textarea
                      id="solution"
                      placeholder="你打算如何实现目标？关键步骤是什么？"
                      value={formData.solution}
                      onChange={(e) => setFormData({...formData, solution: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="verification">验证标准 *</Label>
                    <Textarea
                      id="verification"
                      placeholder="如何判断项目是否成功？具体的可衡量指标是什么？"
                      value={formData.verification}
                      onChange={(e) => setFormData({...formData, verification: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>⚠️ 重要：</strong>项目逻辑闭环是审核的核心重点。请确保目标、问题、方案、验证标准之间存在清晰的逻辑关系，避免空泛的描述。
                    </p>
                  </div>
                </div>
              )}

              {/* 第三步：资源与风险 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="existingResources">当前已有资源 *</Label>
                    <Textarea
                      id="existingResources"
                      placeholder="你已经拥有哪些资源？技术、团队、资金、合作伙伴等"
                      value={formData.existingResources}
                      onChange={(e) => setFormData({...formData, existingResources: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="neededResources">当前仍需支持 *</Label>
                    <Textarea
                      id="neededResources"
                      placeholder="你还需要哪些资源支持？资金、技术、人力、渠道等"
                      value={formData.neededResources}
                      onChange={(e) => setFormData({...formData, neededResources: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="keyRisks">关键风险 *</Label>
                    <Textarea
                      id="keyRisks"
                      placeholder="项目可能面临哪些风险？技术、市场、运营、时间等"
                      value={formData.keyRisks}
                      onChange={(e) => setFormData({...formData, keyRisks: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="riskResponses">应对思路 *</Label>
                    <Textarea
                      id="riskResponses"
                      placeholder="针对上述风险，你有什么应对措施？预案是什么？"
                      value={formData.riskResponses}
                      onChange={(e) => setFormData({...formData, riskResponses: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      <strong>⚠️ 重要：</strong>真实地评估风险并提出应对方案，会大大增加项目通过审核的概率。隐瞒风险或应对方案不充分会导致审核不通过。
                    </p>
                  </div>
                </div>
              )}

              {/* 第四步：时间安排 */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeline">初步时间安排 *</Label>
                    <Textarea
                      id="timeline"
                      placeholder="请列出项目的主要阶段和时间节点（例如：第1-2月完成开发，第3月测试等）"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      rows={6}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="publicStage">公开展示阶段 *</Label>
                      <Select
                        value={formData.publicStage}
                        onValueChange={(value) => setFormData({...formData, publicStage: value})}
                      >
                        <SelectTrigger id="publicStage">
                          <SelectValue placeholder="请选择公开展示阶段" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_PUBLIC_STAGE_OPTIONS.map((option) => (
                            <SelectItem key={option.slug} value={option.slug}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="badgeLabel">推荐标签</Label>
                      <Select
                        value={formData.badgeLabel}
                        onValueChange={(value) => setFormData({...formData, badgeLabel: value})}
                      >
                        <SelectTrigger id="badgeLabel">
                          <SelectValue placeholder="请选择推荐标签" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_BADGE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="completionRate">当前进度（%）</Label>
                      <Input
                        id="completionRate"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0-100"
                        value={formData.completionRate}
                        onChange={(e) => setFormData({...formData, completionRate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supporterCount">预估支持人数</Label>
                      <Input
                        id="supporterCount"
                        type="number"
                        min="0"
                        placeholder="例如 128"
                        value={formData.supporterCount}
                        onChange={(e) => setFormData({...formData, supporterCount: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="daysLeft">剩余天数</Label>
                      <Input
                        id="daysLeft"
                        type="number"
                        min="0"
                        placeholder="例如 21"
                        value={formData.daysLeft}
                        onChange={(e) => setFormData({...formData, daysLeft: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="supportTiers">支持档位</Label>
                    <Textarea
                      id="supportTiers"
                      placeholder={'请按每行一个档位填写，例如：\n29 元：感谢支持，获得阶段更新邮件\n99 元：首轮观看资格'}
                      value={formData.supportTiers}
                      onChange={(e) => setFormData({...formData, supportTiers: e.target.value})}
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="latestUpdates">最新更新</Label>
                    <Textarea
                      id="latestUpdates"
                      placeholder={'请按每行一条更新填写，例如：\n已完成第一版原型设计\n正在招募首批测试用户'}
                      value={formData.latestUpdates}
                      onChange={(e) => setFormData({...formData, latestUpdates: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">时间安排建议：</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>分为明确的阶段，每个阶段有具体目标</li>
                      <li>预留缓冲时间，应对不可预见情况</li>
                      <li>设置里程碑节点，便于跟踪进度</li>
                      <li>考虑项目规模和资源情况，设定合理的时间表</li>
                      <li>支持档位和更新内容越清晰，审核通过后越容易直接公开展示</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 第五步：联系方式 */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactName">联系人姓名 *</Label>
                    <Input
                      id="contactName"
                      placeholder="请输入联系人姓名"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactEmail">联系邮箱 *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="请输入联系邮箱"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone">联系电话</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="请输入联系电话（选填）"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    />
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      请确保联系方式准确，我们会通过这些信息与您沟通审核结果和后续进展。
                    </p>
                  </div>
                </div>
              )}

              {/* 第六步：确认提交 */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      项目信息确认
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">项目名称</h4>
                        <p>{formData.projectName || '（未填写）'}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">项目类型</h4>
                        <Badge variant="outline">{PROJECT_TYPE_LABELS[formData.projectType] || '（未选择）'}</Badge>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {subcategoryOptions.find((option) => option.value === formData.projectSubcategory)?.label || '（未选择二级分类）'}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">项目简介</h4>
                        <p>{formData.description || '（未填写）'}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">项目目标</h4>
                        <p className="whitespace-pre-line">{formData.goal || '（未填写）'}</p>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">公开展示配置</h4>
                        <div className="space-y-2 text-sm">
                          <p>展示阶段：{PROJECT_PUBLIC_STAGE_OPTIONS.find((option) => option.slug === formData.publicStage)?.label || '（未选择）'}</p>
                          <p>推荐标签：{formData.badgeLabel || '平台审核通过'}</p>
                          <p>当前进度：{formData.completionRate || '0'}%</p>
                          <p>预估支持人数：{formData.supporterCount || '0'}</p>
                          <p>剩余天数：{formData.daysLeft || '0'} 天</p>
                        </div>
                      </div>

                      {formData.supportTiers.trim() ? (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">支持档位</h4>
                            <p className="whitespace-pre-line">{formData.supportTiers}</p>
                          </div>
                        </>
                      ) : null}

                      {formData.latestUpdates.trim() ? (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">最新更新</h4>
                            <p className="whitespace-pre-line">{formData.latestUpdates}</p>
                          </div>
                        </>
                      ) : null}
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">联系人</h4>
                        <p>{formData.contactName || '（未填写）'}</p>
                        <p className="text-sm text-muted-foreground">{formData.contactEmail || '（未填写）'}</p>
                      </div>
                    </div>
                  </div>

                  {submitSuccess ? (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                      {submitSuccess}
                    </div>
                  ) : null}

                  {submitError ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                      {submitError}
                    </div>
                  ) : null}

                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      提交前请注意
                    </h4>
                    <ul className="list-disc list-inside text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>项目提交后将进入审核流程，审核通过后方可立项</li>
                      <li>请确保所有信息真实、准确、完整</li>
                      <li>审核结果将通过邮件通知，请保持关注</li>
                      <li>提交后的项目信息不可自行修改，如有疑问请联系管理员</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>审核流程：</strong>提交申请 → 平台初审（1-3个工作日）→ 共创审核（3-7个工作日）→ 审核结果通知
                    </p>
                  </div>
                </div>
              )}

              {/* 导航按钮 */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  上一步
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
                    <Rocket className="h-5 w-5 mr-2" />
                    {isSubmitting ? '提交中...' : '提交申请'}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    下一步
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
