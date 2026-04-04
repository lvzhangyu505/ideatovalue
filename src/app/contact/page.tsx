import Link from 'next/link';
import { ArrowLeft, Handshake, Mail, MessageCircleMore, MessagesSquare, Scale, ShieldAlert } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contactSections = [
  {
    title: '项目咨询',
    description:
      '如需了解项目发起条件、审核标准、支持档位设置、项目页填写方式等，可通过平台官方联系入口进行咨询。',
    icon: MessagesSquare,
    accent: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-500',
  },
  {
    title: '规则反馈',
    description:
      '如果对平台机制、项目流程、社群规则、退款条款或页面逻辑有建议，欢迎反馈。平台会持续根据真实使用情况进行调整优化。',
    icon: Scale,
    accent: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: '合作联系',
    description:
      '如果有内容共创、资源联动、活动协办、品牌合作、顾问支持等合作意向，也可通过平台联系团队。',
    icon: Handshake,
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
  },
  {
    title: '问题申诉',
    description:
      '如遇到项目争议、页面异常、信息错误、侵权投诉或其他需要平台介入的问题，可提交说明材料，平台将在核实后进行处理。',
    icon: ShieldAlert,
    accent: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
] as const;

export default function ContactPage() {
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
              <Link href="/about" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                平台介绍
              </Link>
              <Link href="/contact" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                联系我们
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
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/80 text-purple-700 shadow-sm hover:bg-white dark:bg-slate-900/70 dark:text-purple-300">
              联系我们
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              联系我们
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              欢迎通过以下方式与 ideatovalue 建立联系。无论是项目发起、合作建议、规则反馈，还是页面问题、申诉沟通，都可以通过统一渠道提交。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {contactSections.map((section) => {
              const Icon = section.icon;

              return (
                <Card
                  key={section.title}
                  className="rounded-2xl border-purple-100/50 bg-white/60 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${section.accent}`}>
                        <Icon className={`h-6 w-6 ${section.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {section.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">联系方式建议展示</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  建议在联系时说明来意、项目名称或问题背景，便于平台更快跟进。
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-purple-100/70 bg-purple-50/60 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <Mail className="h-4 w-4 text-purple-500" />
                    邮箱
                  </div>
                  <a
                    href="mailto:lux932519@gmail.com"
                    className="break-all text-base font-semibold text-purple-700 transition-colors hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-200"
                  >
                    lux932519@gmail.com
                  </a>
                </div>

                <div className="rounded-2xl border border-blue-100/70 bg-blue-50/60 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <MessageCircleMore className="h-4 w-4 text-blue-500" />
                    微信客服
                  </div>
                  <p className="text-base font-semibold text-blue-700 dark:text-blue-300">lzy150627</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 dark:text-amber-100">提交建议</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                为了提升处理效率，建议在联系时附上项目链接、页面截图、问题时间点或相关说明材料。涉及申诉和争议时，尽量提供完整沟通记录。
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
