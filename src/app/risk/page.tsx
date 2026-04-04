import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Clock3, Layers3, ShieldAlert, TrendingUp, TriangleAlert } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const riskSections = [
  {
    title: '项目可能延期',
    description:
      '项目推进可能因供应、时间、资源、协作、技术、政策变化等因素而延期。延期不一定代表失信，但发起人有义务及时说明。',
    icon: Clock3,
    accent: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-500',
  },
  {
    title: '项目可能调整范围',
    description:
      '部分项目在推进中，可能需要缩减功能、调整形式、改变交付节奏或重设阶段目标。平台鼓励发起人如实更新，而不是回避变化。',
    icon: Layers3,
    accent: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: '项目可能无法完全达成原始设想',
    description:
      '创意从概念到落地，中间存在现实约束。平台支持真实推进，但不承诺所有项目都能按初始蓝图完整实现。',
    icon: TriangleAlert,
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
  },
  {
    title: '支持不等于收益承诺',
    description:
      '平台支持机制不构成投资建议，不承诺固定回报、分红、保底收益或资产增值。',
    icon: TrendingUp,
    accent: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    title: '平台不对项目结果作兜底担保',
    description:
      '平台会进行基础审核、过程协调与规则管理，但项目的实际推进与交付责任仍主要由发起人承担。支持者应基于自身判断作出决定。',
    icon: ShieldAlert,
    accent: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
] as const;

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-purple-900/30 dark:bg-slate-950/70">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-90 blur-[2px]"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400"></div>
                <div className="absolute inset-2 rounded-full bg-white/40 backdrop-blur-sm dark:bg-white/20"></div>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent transition-all group-hover:from-purple-500 group-hover:to-blue-500">
                共创平台
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-10 md:flex lg:gap-16">
              <Link href="/projects" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                发现项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                发起项目
              </Link>
              <Link href="/risk" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                风险提示
              </Link>
            </nav>

            <AuthActions />
          </div>
        </div>
      </header>

      <div className="border-b border-purple-100/50 bg-white/50 backdrop-blur-sm dark:border-purple-900/30 dark:bg-slate-950/50">
        <div className="container mx-auto px-6 py-3 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </div>

      <section className="border-b border-purple-100/50 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 py-12 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/80 text-purple-700 shadow-sm hover:bg-white dark:bg-slate-900/70 dark:text-purple-300">
              风险提示
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              风险提示
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              创意项目天然具有不确定性。支持一个项目，意味着支持者理解并接受项目可能在推进过程中出现变化。为保护发起人与支持者双方，平台特别提醒如下：
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-12">
          <div className="space-y-6">
            <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-amber-900 dark:text-amber-100">核心提醒</CardTitle>
                    <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-200/80">支持前请先理解项目的不确定性</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                平台鼓励在充分理解项目属性、阶段目标、风险说明与退款规则的前提下进行支持。理性判断，比盲目期待更重要。
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-purple-100/50 bg-white/60 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-xl">阅读建议</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>支持项目前，建议同时查看项目详情页中的交付安排、阶段更新、退款说明与项目方历史记录。</p>
                <p>如果项目在执行过程中出现变化，重点看项目方是否及时更新、是否诚实说明、是否持续承担推进责任。</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            {riskSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <Card
                  key={section.title}
                  className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.accent}`}>
                        <Icon className={`h-6 w-6 ${section.iconColor}`} />
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-300">0{index + 1}</p>
                        <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{section.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-base leading-8 text-slate-600 dark:text-slate-400">
                    {section.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
