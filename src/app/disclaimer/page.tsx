import Link from 'next/link';
import { AlertTriangle, ArrowLeft, BadgeAlert, CircleOff, ShieldBan, UserCheck, Waves } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const disclaimerSections = [
  {
    title: '平台不构成投资建议',
    description:
      '平台上的项目展示、支持档位、案例内容、项目更新等信息，不构成任何形式的投资建议、财务承诺或收益保证。',
    icon: BadgeAlert,
    accent: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-500',
  },
  {
    title: '平台不为项目结果作兜底承诺',
    description:
      '平台会进行基本审核与规则管理，但不对项目一定成功、一定按期交付、一定获得支持或一定实现预期成果作保证。',
    icon: ShieldBan,
    accent: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: '用户应基于自身判断作出决策',
    description:
      '无论是发起项目还是支持项目，用户都应基于自身理解和判断参与，平台不替代用户完成商业判断、风险判断与合作判断。',
    icon: UserCheck,
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
  },
  {
    title: '对第三方行为不作全面担保',
    description:
      '对于用户、项目方、支持者、合作方之间产生的具体争议、履约偏差或合作纠纷，平台可在必要范围内协调，但不承担无限责任。',
    icon: CircleOff,
    accent: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    title: '不可抗力与外部因素',
    description:
      '因政策变化、市场环境、技术故障、网络中断、不可抗力或其他平台难以控制的原因导致的服务中断、项目调整或功能变化，平台不承担超出法律规定范围的责任。',
    icon: Waves,
    accent: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
] as const;

export default function DisclaimerPage() {
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
                浏览项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                发起项目
              </Link>
              <Link href="/disclaimer" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                免责声明
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
              免责声明
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              免责声明
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              为帮助用户理解平台边界，特作如下声明：
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
                    <CardTitle className="text-xl text-amber-900 dark:text-amber-100">边界提醒</CardTitle>
                    <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-200/80">平台提供连接与管理，不替代用户判断</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                免责声明的目的，是帮助平台、发起人和支持者在同一个边界认知下协作，减少因理解偏差产生的不必要预期。
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-purple-100/50 bg-white/60 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-xl">阅读建议</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>建议将本页与服务条款、风险提示、项目页规则说明一起阅读，建立更完整的平台使用预期。</p>
                <p>如果后续平台规则升级或法务要求变化，本页面内容也应同步更新。</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            {disclaimerSections.map((section, index) => {
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
