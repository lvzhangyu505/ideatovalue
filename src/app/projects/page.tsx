'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Clock, Search, SlidersHorizontal, Sparkles, Users } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { DiscoverProjectsMenu } from '@/components/discover-projects-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  discoveryCategories,
  discoveryProjects,
  discoveryProjectStages,
  discoveryRecommendedViews,
  getDiscoveryCategory,
  getDiscoveryStageLabel,
  getSecondaryCategoryLabel,
} from '@/lib/project-discovery';

const stageStyles: Record<string, string> = {
  applying: 'bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200',
  reviewing: 'bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300',
  supporting: 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
  executing: 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300',
  'reviewing-results': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300',
  completed: 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-300',
};

const sortOptions = [
  { value: 'newest', label: '最新上线' },
  { value: 'popular', label: '支持热度' },
  { value: 'deadline', label: '即将截止' },
  { value: 'completion', label: '高完成度' },
] as const;

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const defaultPrimary = discoveryCategories[0]?.slug ?? '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrimary, setSelectedPrimary] = useState(defaultPrimary);
  const [selectedSecondary, setSelectedSecondary] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedView, setSelectedView] = useState('all');
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]['value']>('newest');

  useEffect(() => {
    const nextPrimaryParam = searchParams.get('primary');
    const nextPrimary =
      nextPrimaryParam && getDiscoveryCategory(nextPrimaryParam) ? nextPrimaryParam : defaultPrimary;
    const nextSecondaryParam = searchParams.get('secondary') || '';
    const nextCategory = getDiscoveryCategory(nextPrimary);
    const nextSecondary = nextCategory?.secondaryCategories.some((secondary) => secondary.slug === nextSecondaryParam)
      ? nextSecondaryParam
      : '';

    setSelectedPrimary(nextPrimary);
    setSelectedSecondary(nextSecondary);
    setSelectedStage(searchParams.get('stage') || 'all');
    setSelectedView(searchParams.get('view') || 'all');

    const nextSort = searchParams.get('sort');
    if (nextSort === 'popular' || nextSort === 'deadline' || nextSort === 'completion' || nextSort === 'newest') {
      setSortBy(nextSort);
    } else {
      setSortBy('newest');
    }
  }, [defaultPrimary, searchParams]);

  const secondaryOptions = useMemo(() => {
    const currentCategory = getDiscoveryCategory(selectedPrimary);
    return (
      currentCategory?.secondaryCategories.map((secondary) => ({
        ...secondary,
        primaryLabel: currentCategory.label,
        primarySlug: currentCategory.slug,
      })) ?? []
    );
  }, [selectedPrimary]);

  useEffect(() => {
    if (!selectedSecondary) {
      return;
    }

    const currentSecondaryExists = secondaryOptions.some((secondary) => secondary.slug === selectedSecondary);

    if (!currentSecondaryExists) {
      setSelectedSecondary('');
    }
  }, [secondaryOptions, selectedSecondary]);

  const selectedViewMeta = discoveryRecommendedViews.find((view) => view.slug === selectedView);

  const filteredProjects = useMemo(() => {
    return discoveryProjects.filter((project) => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.creator.toLowerCase().includes(normalizedQuery);

      const matchesPrimary = !selectedPrimary || project.primaryCategory === selectedPrimary;
      const matchesSecondary = !selectedSecondary || project.secondaryCategory === selectedSecondary;
      const matchesStage = selectedStage === 'all' || project.stage === selectedStage;
      const matchesView = selectedView === 'all' || project.recommendations.includes(selectedView);

      return matchesSearch && matchesPrimary && matchesSecondary && matchesStage && matchesView;
    });
  }, [searchQuery, selectedPrimary, selectedSecondary, selectedStage, selectedView]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((left, right) => {
      switch (sortBy) {
        case 'popular':
          return right.supporters - left.supporters;
        case 'deadline':
          return left.daysLeft - right.daysLeft;
        case 'completion':
          return right.completionRate - left.completionRate;
        case 'newest':
        default:
          return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
      }
    });
  }, [filteredProjects, sortBy]);

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
              <DiscoverProjectsMenu active />
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

      <section className="sticky top-20 z-40 border-b border-purple-100/50 bg-white/65 py-5 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-950/65">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索项目名称、简介或发起人..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-12 rounded-full border-purple-200/60 bg-white/85 pl-11 pr-4 dark:border-purple-800/50 dark:bg-slate-900/75"
              />
            </div>

            <div className="-mx-1 overflow-x-auto pb-1">
              <div className="flex min-w-max items-center gap-2 px-1">
                {discoveryCategories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={selectedPrimary === category.slug ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedPrimary(category.slug);
                      setSelectedSecondary('');
                    }}
                    className={
                      selectedPrimary === category.slug
                        ? 'rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'rounded-full bg-white/85 dark:bg-slate-900/75'
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {secondaryOptions.map((secondary) => (
                <Button
                  key={`${secondary.primarySlug}-${secondary.slug}`}
                  variant={selectedSecondary === secondary.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSecondary(secondary.slug)}
                  className={
                    selectedSecondary === secondary.slug
                      ? 'rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'rounded-full bg-white/85 dark:bg-slate-900/75'
                  }
                >
                  {secondary.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedView !== 'all' ? (
                <Badge className="h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 text-white">
                  当前推荐入口：{selectedViewMeta?.label ?? selectedView}
                </Badge>
              ) : null}

              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-[160px] rounded-full bg-white/85 dark:bg-slate-900/75">
                  <SelectValue placeholder="项目阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  {discoveryProjectStages.map((stage) => (
                    <SelectItem key={stage.slug} value={stage.slug}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as (typeof sortOptions)[number]['value'])}>
                <SelectTrigger className="w-[160px] rounded-full bg-white/85 dark:bg-slate-900/75">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-purple-100/60 bg-white/70 p-5 shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/65 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <SlidersHorizontal className="h-4 w-4 text-purple-500" />
                当前共找到 <span className="text-slate-900 dark:text-slate-100">{sortedProjects.length}</span> 个项目
              </div>
              {selectedViewMeta ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  当前入口：<span className="font-medium text-slate-900 dark:text-slate-100">{selectedViewMeta.label}</span>
                  ，{selectedViewMeta.description}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  你可以通过分类、阶段和排序，自由切换到适合自己的发现视角。
                </p>
              )}
            </div>

            {(selectedView !== 'all' || selectedPrimary !== defaultPrimary || !!selectedSecondary || selectedStage !== 'all' || searchQuery) ? (
              <Link href="/projects">
                <Button variant="outline" className="rounded-full">
                  清空筛选
                </Button>
              </Link>
            ) : null}
          </div>

          {sortedProjects.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-purple-200/70 bg-white/70 px-6 py-16 text-center shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-3xl">
                🔎
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">当前筛选下还没有匹配项目</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                试着切换一级分类、放宽二级分类，或者回到“本周推荐”和“刚上线”入口继续发现。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedProjects.map((project) => {
                const primaryCategory = getDiscoveryCategory(project.primaryCategory);
                const secondaryLabel = getSecondaryCategoryLabel(project.primaryCategory, project.secondaryCategory);

                return (
                  <Card
                    key={project.id}
                    className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-purple-100/60 bg-white/75 shadow-xl shadow-purple-500/6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/12 dark:border-purple-900/30 dark:bg-slate-900/70"
                  >
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-purple-100/70 via-pink-100/60 to-blue-100/70 text-6xl dark:from-purple-900/30 dark:via-pink-900/20 dark:to-blue-900/30">
                      {project.emoji}
                    </div>
                    <CardHeader className="pb-3">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge className={stageStyles[project.stage] ?? stageStyles.applying}>
                          {getDiscoveryStageLabel(project.stage)}
                        </Badge>
                        <Badge variant="outline">{primaryCategory?.label}</Badge>
                        <Badge variant="outline">{secondaryLabel}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <p className="line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-purple-100/80 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300">
                          <Sparkles className="mr-1 h-3 w-3" />
                          {project.badgeLabel}
                        </Badge>
                      </div>

                      <div className="space-y-3 rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">完成度</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{project.completionRate}%</span>
                        </div>
                        <Progress value={project.completionRate} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{project.supporters} 人关注</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{project.daysLeft > 0 ? `${project.daysLeft} 天剩余` : '已进入结果阶段'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-slate-500 dark:text-slate-400">发起人：{project.creator}</div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/projects/${project.id}`} className="w-full">
                        <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                          查看项目详情
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectsPageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
      <div className="border-b border-purple-100/50 bg-white/70 py-12 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-950/70">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="h-10 w-56 rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 lg:px-12">
        <div className="h-28 rounded-[32px] bg-white/70 shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:bg-slate-900/65" />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] rounded-[28px] bg-white/70 shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:bg-slate-900/65"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsPageFallback />}>
      <ProjectsPageContent />
    </Suspense>
  );
}
