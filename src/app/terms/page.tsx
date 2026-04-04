import Link from 'next/link';
import { ArrowLeft, FileText, Gavel, ShieldAlert, Sparkles } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const termsSections = [
  {
    title: '平台性质',
    description:
      'ideatovalue 是一个面向创意项目发起、支持与共创协作的平台。平台提供项目展示、规则说明、支持连接、阶段更新与基础管理能力，但不对所有项目结果作实质性保证。',
  },
  {
    title: '用户责任',
    description:
      '用户应保证其提交的信息真实、合法、完整，不得利用平台发布违法、侵权、虚假、欺诈或误导性内容。',
  },
  {
    title: '项目责任',
    description:
      '项目由发起人自主发起。发起人应对项目说明、支持档位、交付安排、风险提示和阶段更新承担主要责任。',
  },
  {
    title: '支持行为说明',
    description:
      '用户支持项目前，应充分阅读项目页内容与相关规则。支持行为一经作出，即视为已知悉项目属性与相应风险。',
  },
  {
    title: '平台管理权',
    description:
      '对于违反平台规则、存在重大争议、明显误导、涉嫌侵权或具有其他风险的平台内容，平台保留暂停展示、下线处理、限制功能或进一步核验的权利。',
  },
  {
    title: '条款更新',
    description:
      '平台有权根据运营情况、规则调整和法律要求，对条款进行更新。更新后的内容一经发布即生效。',
  },
] as const;

export default function TermsPage() {
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
              <Link href="/terms" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                服务条款
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
              服务条款
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              服务条款
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              欢迎使用 ideatovalue 平台。在使用平台前，请仔细阅读本条款。使用平台即视为已理解并同意本条款的相关内容。
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
                    <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">阅读说明</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">这是当前可上站的运营版条款</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>这份条款用于说明平台基本性质、用户责任、项目责任与平台管理边界，帮助用户建立清晰预期。</p>
                <p>如果平台后续涉及更复杂的交易、合作或合规场景，建议继续完善细则与外部审核流程。</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <Gavel className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-amber-900 dark:text-amber-100">后续建议</CardTitle>
                    <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-200/80">建议补一次正式法务审核</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                这页目前采用的是适合先上线使用的运营版文本。后续如果平台进入正式对外运营阶段，建议再让专业法务做一次完整审核。
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            {termsSections.map((section, index) => (
              <Card
                key={section.title}
                className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                      <Sparkles className="h-6 w-6 text-purple-500" />
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
