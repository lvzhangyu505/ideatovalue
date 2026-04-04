import Link from 'next/link';
import { AuthActions } from '@/components/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Rocket, 
  Target, 
  Shield, 
  Users,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export default function AboutPage() {
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
                浏览项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all">
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
            关于平台
          </h1>
          <p className="text-slate-600 dark:text-slate-400">了解共创平台的理念和机制</p>
        </div>
      </section>

      {/* 平台介绍 */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-100/80 to-blue-100/80 dark:from-purple-900/30 dark:to-blue-900/30 px-6 py-3 rounded-full mb-6 backdrop-blur-md border border-purple-200/50 dark:border-purple-800/50 shadow-lg shadow-purple-500/10">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full opacity-90 blur-[1px]"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 rounded-full"></div>
              </div>
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">拥抱你的价值·共创无限可能</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 dark:from-slate-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
              什么是共创平台？
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              共创平台是一个面向社群内部的创意项目孵化与支持平台，让成员可以发起项目、通过逻辑闭环审核、获得社群支持、持续更新进展、最终完成结项复盘。
            </p>
          </div>

          {/* 核心价值 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7 text-purple-500" />
                </div>
                <CardTitle className="text-lg">逻辑闭环优先</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  不是"谁会卖，谁上架"，而是"谁的项目逻辑更完整，谁获得支持"。通过严格的审核机制，确保每个项目都有清晰的路径和可验证的目标。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-blue-500" />
                </div>
                <CardTitle className="text-lg">风险可控</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  完整的审核流程、透明的进展更新、明确的退款规则。我们承诺不构成投资，不担保成功，但会尽力降低风险，保护支持者权益。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>社群共建</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  不是简单的资金支持，而是真正的共创。支持者可以参与讨论、提供反馈、共同迭代。项目成功，每个人都有贡献。
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 平台机制 */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                完整的项目共创机制
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">申请审核</h3>
                    <p className="text-muted-foreground">
                      项目发起人提交详细的项目申请表，包括项目目标、要解决的问题、面向对象、方案路径、验证标准等。平台进行初审，专家进行共创审核，确保项目逻辑完整、风险可控。
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">执行更新</h3>
                    <p className="text-muted-foreground">
                      项目立项后，发起人需要定期提交阶段更新，包括已完成事项、关键数据、当前障碍、下一步计划。所有更新公开展示，确保透明度。
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">结项复盘</h3>
                    <p className="text-muted-foreground">
                      项目完成后，发起人需要提交结项复盘，包括最终结果、与原目标的差距、最有效动作、最大问题、可复用经验等。复盘内容公开展示，为后续项目提供参考。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 支持方式 */}
          <Card>
            <CardHeader>
              <CardTitle>支持方式说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">回报型支持</Badge>
                <div>
                  <p className="font-semibold mb-1">不是投资</p>
                  <p className="text-sm text-muted-foreground">
                    平台支持是基于回报的支持，不是投资。不承诺收益，不涉及分红，不保证本金安全。支持者获得的是项目承诺的回报（产品、服务、体验等）。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">参与共创</Badge>
                <div>
                  <p className="font-semibold mb-1">联合共创席位</p>
                  <p className="text-sm text-muted-foreground">
                    部分项目提供"联合共创席位"，支持者可以参与项目讨论、提供反馈建议、优先体验功能。需要注意的是，联合共创席位提供的是参与权、反馈权、讨论权，不等于分红权、控制权、收益权。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">退款规则</Badge>
                <div>
                  <p className="font-semibold mb-1">有条件退款</p>
                  <p className="text-sm text-muted-foreground">
                    平台制定了详细的退款规则。在项目未达标、长期失联、严重偏离承诺、虚假信息等情况下，支持者可以申请退款。具体规则请查看退款页面。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部声明 */}
      <section className="border-t bg-muted/30 py-8">
        <div className="container max-w-4xl">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  • 本平台为社群内部项目支持安排，不构成投资建议。审核通过不等于平台担保成功。
                </p>
                <p>
                  • 支持项目是基于回报型支持，不承诺收益，不涉及分红，不保证本金安全。
                </p>
                <p>
                  • 项目发起人对项目承诺的真实性、可行性承担全部责任。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
