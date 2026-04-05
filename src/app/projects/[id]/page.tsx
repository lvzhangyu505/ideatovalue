import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers3,
  ListChecks,
  PackageOpen,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  discoveryProjects,
  type DiscoveryProject,
  getDiscoveryCategory,
  getDiscoveryProjectById,
  getDiscoveryStageLabel,
  getSecondaryCategoryLabel,
} from '@/lib/project-discovery';
import { fromPublicProjectId, mapSubmissionToDiscoveryProject, type ProjectSubmissionRecord } from '@/lib/project-submissions';
import { createSupabaseServiceClient, isSupabaseServerConfigured } from '@/lib/supabase/server';

const stageStyles: Record<string, string> = {
  applying: 'bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200',
  reviewing: 'bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300',
  supporting: 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
  executing: 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300',
  'reviewing-results': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300',
  completed: 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-300',
};

export function generateStaticParams() {
  return discoveryProjects.map((project) => ({
    id: String(project.id),
  }));
}

async function getProjectForDetail(id: string): Promise<DiscoveryProject | null> {
  const staticProject = getDiscoveryProjectById(id);
  if (staticProject) {
    return staticProject;
  }

  const submissionId = fromPublicProjectId(id);
  if (!submissionId || !isSupabaseServerConfigured()) {
    return null;
  }

  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('id', submissionId)
      .eq('status', 'approved')
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return mapSubmissionToDiscoveryProject(data as ProjectSubmissionRecord);
  } catch (error) {
    console.error('读取公开项目详情失败:', error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectForDetail(id);

  if (!project) {
    notFound();
  }

  const primaryCategory = getDiscoveryCategory(project.primaryCategory);
  const secondaryLabel = getSecondaryCategoryLabel(project.primaryCategory, project.secondaryCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-purple-900/30 dark:bg-slate-950/70">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-90 blur-[2px]" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400" />
                <div className="absolute inset-2 rounded-full bg-white/40 backdrop-blur-sm dark:bg-white/20" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent transition-all group-hover:from-purple-500 group-hover:to-blue-500">
                共创平台
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-10 md:flex lg:gap-16">
              <Link href="/projects" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300">
                发现项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                平台介绍
              </Link>
            </nav>

            <AuthActions />
          </div>
        </div>
      </header>

      <div className="border-b border-purple-100/50 bg-white/50 dark:border-purple-900/30 dark:bg-slate-950/50">
        <div className="container mx-auto px-6 py-4 lg:px-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
            <ArrowLeft className="h-4 w-4" />
            返回项目列表
          </Link>
        </div>
      </div>

      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-8">
              <Card className="overflow-hidden rounded-[32px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                <CardContent className="p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{primaryCategory?.label}</Badge>
                    <Badge variant="outline">{secondaryLabel}</Badge>
                    <Badge className={stageStyles[project.stage] ?? stageStyles.applying}>
                      {getDiscoveryStageLabel(project.stage)}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300">
                      <Sparkles className="mr-1 h-3 w-3" />
                      {project.badgeLabel}
                    </Badge>
                  </div>

                  <div className="mb-6 flex items-start gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] bg-gradient-to-br from-purple-100/80 via-pink-100/70 to-blue-100/80 text-4xl dark:from-purple-900/40 dark:via-pink-900/30 dark:to-blue-900/30">
                      {project.emoji}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
                        {project.title}
                      </h1>
                      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                        {project.longDescription}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                      <div className="text-sm text-slate-500 dark:text-slate-400">发起人</div>
                      <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {project.creator}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                      <div className="text-sm text-slate-500 dark:text-slate-400">项目目标</div>
                      <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {project.goal}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                      <div className="text-sm text-slate-500 dark:text-slate-400">支持人数</div>
                      <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {project.supporters}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                      <div className="text-sm text-slate-500 dark:text-slate-400">剩余时间</div>
                      <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {project.daysLeft} 天
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] bg-slate-50/80 p-5 dark:bg-slate-950/60">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">当前进度</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{project.completionRate}%</span>
                    </div>
                    <Progress value={project.completionRate} className="h-2" />
                    <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{project.supporters} 人支持</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>剩余 {project.daysLeft} 天</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 xl:grid-cols-2">
                <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      项目简介
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                    {project.description}
                  </CardContent>
                </Card>

                <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      为什么发起
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                    {project.whyNow}
                  </CardContent>
                </Card>

                {project.solution ? (
                  <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers3 className="h-5 w-5 text-violet-500" />
                        方案路径
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                      {project.solution}
                    </CardContent>
                  </Card>
                ) : null}

                {project.verification ? (
                  <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ListChecks className="h-5 w-5 text-cyan-500" />
                        验证标准
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                      {project.verification}
                    </CardContent>
                  </Card>
                ) : null}

                <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      风险说明
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {project.risks.map((risk) => (
                        <li key={risk} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {(project.existingResources || project.neededResources) ? (
                  <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PackageOpen className="h-5 w-5 text-indigo-500" />
                        资源现状
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.existingResources ? (
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">当前已有资源</div>
                          <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.existingResources}</div>
                        </div>
                      ) : null}
                      {project.neededResources ? (
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">当前仍需支持</div>
                          <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.neededResources}</div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ) : null}

                {project.timeline ? (
                  <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-sky-500" />
                        时间安排
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                      {project.timeline}
                    </CardContent>
                  </Card>
                ) : null}

                {project.progressUpdates && project.progressUpdates.length > 0 ? (
                  <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-purple-500" />
                        项目进度记录
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.progressUpdates.map((item, index) => (
                        <div
                          key={`${item.recordedAt}-${index}`}
                          className="rounded-2xl border border-purple-100/70 bg-slate-50/80 p-5 dark:border-purple-900/40 dark:bg-slate-950/60"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {new Date(item.recordedAt).toLocaleString('zh-CN')}
                            </div>
                          </div>
                          <div className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">{item.details}</div>
                          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span>当时进度：{item.completionRate}%</span>
                            <span>当时支持人数：{item.supporterCount}</span>
                            <span>当时剩余时间：{item.daysLeft} 天</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : null}

                <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      最新更新
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {project.updates.map((update) => (
                        <li key={update} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{update}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="sticky top-24">
                <Card className="rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader>
                    <CardTitle>支持档位</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.tiers.length === 0 ? (
                      <div className="rounded-2xl bg-slate-50/80 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
                        该项目已通过审核并公开展示，正式支持档位将在发起人补充后开放。
                      </div>
                    ) : (
                      project.tiers.map((tier, index) => (
                        <div key={`${project.id}-${tier.amount}`}>
                          <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {tier.amount} 元
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                              {tier.description}
                            </p>
                            <Button className="mt-4 w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                              选择这个档位
                            </Button>
                          </div>
                          {index !== project.tiers.length - 1 ? <Separator className="my-4" /> : null}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t bg-white/40 py-8 dark:border-purple-900/30 dark:bg-slate-950/40">
        <div className="container mx-auto px-6 lg:px-12">
          <Card className="border-purple-100/60 bg-white/75 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
            <CardContent className="p-6">
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <p className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <span><strong>非投资声明：</strong>平台项目展示不构成投资建议，也不承诺固定收益或保底回报。</span>
                </p>
                <p className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                  <span><strong>支持提醒：</strong>请结合项目目标、风险说明、更新节奏与自身判断理性支持。</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
