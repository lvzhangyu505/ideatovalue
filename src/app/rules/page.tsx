import Link from 'next/link';
import { AuthActions } from '@/components/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle2,
  AlertTriangle,
  Shield,
  FileText,
  Clock,
  Users,
  Target
} from 'lucide-react';

export default function RulesPage() {
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
              <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                平台介绍
              </Link>
              <Link href="/rules" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all">
                规则说明
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
            规则说明
          </h1>
          <p className="text-slate-600 dark:text-slate-400">了解平台规则，保障共创项目顺利进行</p>
        </div>
      </section>

      {/* 规则内容 */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          
          {/* 项目发起规则 */}
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 shadow-2xl shadow-purple-500/10 rounded-2xl mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">项目发起规则</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">发起项目需要遵循的基本规则</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  申请条件
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-6">
                  <li>必须是社群注册成员</li>
                  <li>项目内容必须符合法律法规和社群价值观</li>
                  <li>不得涉及敏感话题、违法违规内容</li>
                  <li>项目逻辑必须完整，有清晰的目标和验证标准</li>
                </ul>
              </div>

              <Separator className="bg-purple-100/50 dark:bg-purple-900/30" />

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  审核标准
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-6">
                  <li>项目逻辑闭环：目标、问题、方案、验证标准是否完整</li>
                  <li>可行性分析：技术方案、资源需求、时间安排是否合理</li>
                  <li>风险评估：是否识别关键风险并有应对措施</li>
                  <li>创新价值：项目是否具有创新性和社会价值</li>
                </ul>
              </div>

              <Separator className="bg-purple-100/50 dark:bg-purple-900/30" />

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  执行要求
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-6">
                  <li>定期更新：至少每7天提交一次阶段更新</li>
                  <li>透明度：所有更新内容必须公开展示</li>
                  <li>反馈响应：及时回复支持者的问题和建议</li>
                  <li>结项复盘：项目完成后提交详细的结项复盘报告</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 支持规则 */}
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 shadow-2xl shadow-purple-500/10 rounded-2xl mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">支持规则</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">支持项目时需要注意的事项</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  支持须知
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-6">
                  <li>仔细阅读项目详情页的所有信息，包括风险提示</li>
                  <li>理解这是回报型支持，不是投资，不承诺收益</li>
                  <li>选择合适的支持档位，了解档位包含的权益和交付时间</li>
                  <li>保留支持凭证，便于后续跟踪和维权</li>
                </ul>
              </div>

              <Separator className="bg-purple-100/50 dark:bg-purple-900/30" />

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  风险提示
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-6">
                  <li>项目执行存在不确定性，可能无法按预期完成</li>
                  <li>支持金额可能无法全额返还，需自担风险</li>
                  <li>项目发起人对项目承诺的真实性负责</li>
                  <li>平台审核通过不等于担保项目成功</li>
                </ul>
              </div>

              <Separator className="bg-purple-100/50 dark:bg-purple-900/30" />

              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200/50 dark:border-yellow-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">重要提醒</h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                      请根据自身经济状况理性支持，不要超出承受能力。支持前请务必仔细阅读项目详情页的风险说明和退款规则。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 禁止事项 */}
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-red-100/50 dark:border-red-900/30 shadow-2xl shadow-red-500/10 rounded-2xl mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-red-600 dark:text-red-400">禁止事项</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">以下行为将被严厉禁止</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">虚假信息</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">发布虚假、误导性的项目信息</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">欺诈行为</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">以欺骗手段获取支持资金</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">违规内容</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">发布违法违规或敏感内容</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">恶意攻击</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">对平台或其他用户进行恶意攻击</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">刷单作弊</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">虚假支持、刷单、刷量等作弊行为</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">恶意套现</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">通过项目进行恶意套现或洗钱</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>违规处理：</strong>一经发现违规行为，平台有权立即下架项目、冻结账户、保留法律追诉权利。情节严重者将永久封禁账号。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 争议解决 */}
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 shadow-2xl shadow-purple-500/10 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">争议解决</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">遇到问题时的解决途径</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">沟通协商</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">首先尝试与项目发起人直接沟通，协商解决问题</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">平台介入</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">若协商无果，可向平台提交申诉，平台将介入调查</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">法律途径</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">涉及重大争议或违法行为的，可通过法律途径解决</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* 底部提示 */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <Card className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-950/30 dark:to-blue-950/30 backdrop-blur-xl border-purple-200/50 dark:border-purple-800/50 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">遵守规则，共创美好</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    共创平台致力于打造一个健康、透明、可信的共创环境。请所有用户共同遵守平台规则，携手共建美好未来。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
