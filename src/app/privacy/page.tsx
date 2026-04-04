import Link from 'next/link';
import { ArrowLeft, Database, EyeOff, Lock, ShieldCheck, UserRoundSearch, Waves } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const privacySections = [
  {
    title: '我们可能收集的信息',
    description:
      '包括但不限于：注册信息、联系方式、项目提交信息、支持记录、沟通记录、设备与访问日志等。',
    icon: Database,
    accent: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-500',
  },
  {
    title: '我们如何使用这些信息',
    description:
      '这些信息主要用于：平台功能实现、项目审核、支持关系确认、用户沟通、争议协调、安全风控与产品优化。',
    icon: UserRoundSearch,
    accent: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: '我们不会随意公开个人隐私',
    description:
      '除法律法规要求、用户授权同意、平台必要服务协作或处理争议所必需的情况外，平台不会擅自对外披露用户个人隐私信息。',
    icon: EyeOff,
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
  },
  {
    title: '用户应注意的公开信息边界',
    description:
      '用户在项目页、评论区、更新页、公开介绍中主动发布的信息，可能会被其他用户看到。请自行判断公开边界，不要披露不必要的敏感信息。',
    icon: Waves,
    accent: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    title: '信息安全',
    description:
      '平台将尽合理努力采取必要措施保护信息安全，但无法承诺在所有情况下完全避免信息风险。',
    icon: Lock,
    accent: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    title: '政策更新',
    description:
      '隐私政策可能根据产品变化和法律要求适时更新。更新后将通过平台页面展示。',
    icon: ShieldCheck,
    accent: 'from-violet-500/20 to-fuchsia-500/20',
    iconColor: 'text-violet-500',
  },
] as const;

export default function PrivacyPage() {
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
              <Link href="/privacy" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                隐私政策
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
              隐私政策
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              隐私政策
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              ideatovalue 重视用户信息与隐私保护。平台仅在必要范围内收集、使用和管理用户信息，并尽力保障信息安全。
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
                    <ShieldCheck className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">隐私边界说明</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">仅在必要范围内收集与使用信息</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>平台收集和使用信息的目标，是保障基础功能、审核流程、沟通协调和平台安全正常运行。</p>
                <p>用户在公开页面主动发布的内容，会天然进入可见范围，因此建议在公开表达时注意个人信息边界。</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            {privacySections.map((section, index) => {
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
