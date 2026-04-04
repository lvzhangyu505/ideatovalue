import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Compass, Layers3, Rocket, Target, WandSparkles } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const guideSections = [
  {
    title: '先想清楚三个问题',
    icon: Compass,
    accent: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-500',
    points: [
      '第一，项目到底要解决什么问题。',
      '第二，为什么这个项目值得现在开始。',
      '第三，支持者为什么愿意支持你，而不是只点赞。',
    ],
  },
  {
    title: '一个项目页至少要讲清楚什么',
    icon: Layers3,
    accent: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    description:
      '一个合格的项目页，至少应包括：项目名称、项目简介、发起背景、核心问题、解决方案、阶段目标、支持方式、交付安排、退款说明、风险提示与阶段更新机制。',
  },
  {
    title: '支持档位怎么设计',
    icon: Target,
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
    description:
      '支持档位不是简单定价，而是项目承诺的结构化表达。建议每个档位都明确写清楚：支持内容、数量限制、交付时间、是否支持退款、是否包含额外权益。平台鼓励档位设计清晰、克制、真实，不鼓励空泛承诺。',
  },
  {
    title: '什么样的项目更容易通过审核',
    icon: CheckCircle2,
    accent: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
    description:
      '目标明确、表达清楚、路径可执行、阶段节奏合理、风险说明充分、发起人有持续推进意识的项目，更容易通过审核。平台不鼓励仅靠情绪、概念或夸张口号推动项目上线。',
  },
  {
    title: '上线后需要做什么',
    icon: Rocket,
    accent: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    description:
      '项目上线不是结束，而是正式开始。发起人需要按阶段更新项目进展，说明当前状态、已完成内容、遇到的问题、下一阶段安排，以及是否有重要调整。更新越透明，越容易获得支持者理解与持续信任。',
  },
  {
    title: '平台更看重什么',
    icon: WandSparkles,
    accent: 'from-violet-500/20 to-fuchsia-500/20',
    iconColor: 'text-violet-500',
    description:
      '平台看重的不是“包装得多厉害”，而是“是否真诚、是否清楚、是否负责任”。一个不完美但逻辑清晰、愿意持续推进的项目，通常比一个说得很大却无法落地的项目更有价值。',
  },
] as const;

export default function GuidePage() {
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
              <Link href="/guide" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                项目指南
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
              项目指南
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              项目指南
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              欢迎来到 ideatovalue 项目指南页。一个好项目，不只是“有想法”，更重要的是“讲得清、做得动、交付得出”。平台希望帮助发起人把创意从一句话，变成可以被理解、被支持、被推进的项目。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-12">
          <div className="space-y-6">
            <Card className="rounded-2xl border-purple-100/50 bg-white/60 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <Compass className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">给发起人的提醒</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">先把逻辑讲清楚，再把项目做起来</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>平台希望看到的是一个能被理解、能被验证、能被持续推进的项目，而不只是一个让人“觉得不错”的概念。</p>
                <p>如果你能把目标、路径、交付和风险说清楚，项目就更容易被审核通过，也更容易获得真实支持。</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 dark:text-amber-100">一句话原则</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                平台更看重真实、清楚、负责的项目表达，而不是靠情绪包装、夸张承诺或口号堆砌来推动上线。
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            {guideSections.map((section, index) => {
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
                    {'points' in section ? (
                      <div className="space-y-3">
                        {section.points.map((point) => (
                          <p key={point}>{point}</p>
                        ))}
                      </div>
                    ) : (
                      <p>{section.description}</p>
                    )}
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
