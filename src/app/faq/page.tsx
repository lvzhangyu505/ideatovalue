import Link from 'next/link';
import { ArrowLeft, CircleHelp, FileSearch, ShieldAlert } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'ideatovalue 是什么？',
    answer:
      'ideatovalue 是一个面向共创社群成员的项目发起与支持平台。这里不是传统意义上的公开众筹网站，也不是单纯的信息展示页，而是一个帮助创意想法被看见、被评估、被支持、被推进的共创空间。',
  },
  {
    question: '平台是否向项目方收费？',
    answer:
      '目前平台以社群内部共创使用为主，不以收取平台服务费为主要目的。项目支持更强调积分、协作、资源匹配与共创推进，而不是单纯的商业抽成。',
  },
  {
    question: '谁可以发起项目？',
    answer:
      '原则上，符合平台定位、愿意接受共创审核机制、能够持续推进项目更新的社群成员，都可以申请发起项目。部分项目可能需要先经过平台初审，确认项目方向、交付逻辑与支持档位设计是否清晰。',
  },
  {
    question: '所有项目都能上线吗？',
    answer:
      '不能。项目上线前需要经过平台审核。审核重点包括：项目目标是否明确、问题是否真实、方案是否具备基本可行性、支持档位是否清晰、风险是否充分说明、发起人是否具备基本推进能力。',
  },
  {
    question: '什么是“共创指导位”？',
    answer:
      '“共创指导位”是平台的重要机制之一。部分项目在正式上线前，需要接受社群内部指导与逻辑闭环审核。指导位的作用不是替项目做决定，而是帮助项目把方向、路径、表达和交付说明理清楚，降低发起后失焦、失信和失控的风险。',
  },
  {
    question: '什么是“观察组”或“监理小组”？',
    answer:
      '对于部分重点项目，平台可能组织由社群成员或相关经验者组成的观察组，对项目阶段更新、交付节奏、风险变化进行跟踪。观察组不等同于投资人，也不替代项目方责任，但会帮助项目提升透明度与推进质量。',
  },
  {
    question: '支持项目后可以提现吗？',
    answer:
      '平台支持不是金融投资行为，也不承诺收益回报。用户一旦选择支持，应以理解项目属性和支持规则为前提。是否支持退款、何时交付、是否可转让，以项目页写明的规则为准。',
  },
  {
    question: '项目失败了怎么办？',
    answer:
      '项目存在推进失败、延期、缩减范围、交付调整等情况。平台会要求发起人进行阶段更新和说明，但无法保证所有项目都按最初设想完成。支持者应充分理解创意项目天然存在的不确定性。',
  },
  {
    question: '平台如何处理纠纷？',
    answer:
      '平台优先鼓励项目方与支持者基于项目页规则、更新记录和沟通记录进行协商。必要时，平台可介入协调，但不对项目结果承担兜底责任。',
  },
] as const;

export default function FaqPage() {
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
              <Link href="/faq" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                常见问题
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
              常见问题
            </Badge>
            <h1 className="mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-slate-100 dark:via-purple-300 dark:to-blue-300">
              常见问题
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              关于平台定位、项目发起、支持规则与共创机制的核心说明，第一次使用前可以先从这里快速了解。
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
                    <CircleHelp className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">阅读指引</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">帮助你更快理解平台机制</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>这里的内容聚焦于平台规则边界、项目审核逻辑和支持者常见疑问，适合作为项目发起前和支持前的快速参考。</p>
                <p>如果你关心更详细的制度与处理流程，还可以继续查看平台介绍、规则说明和退款规则页面。</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-amber-900 dark:text-amber-100">重要提醒</CardTitle>
                    <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-200/80">支持项目并不等于金融投资</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                平台鼓励理性支持与透明协作。支持前请先阅读项目页中的风险说明、交付安排和退款规则，再根据自身判断做决定。
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-purple-100/50 bg-white/60 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                    <FileSearch className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">相关页面</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">继续深入了解平台规则</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Link href="/about" className="block text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                  平台介绍
                </Link>
                <Link href="/rules" className="block text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                  规则说明
                </Link>
                <Link href="/refund" className="block text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                  退款规则
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">问题列表</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                点击每一项即可查看详细说明。
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index + 1}`} className="border-purple-100/70 dark:border-purple-900/30">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-800 hover:text-purple-600 dark:text-slate-100 dark:hover:text-purple-300">
                      <span className="pr-4">
                        {index + 1}. {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pr-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
