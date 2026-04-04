import Link from 'next/link';
import { AuthActions } from '@/components/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle2, 
  XCircle,
  ArrowLeft,
  Info
} from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">共创平台</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors">
                浏览项目
              </Link>
              <Link href="/start" className="text-sm font-medium hover:text-primary transition-colors">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                平台介绍
              </Link>
            </nav>
          </div>

          <AuthActions />
        </div>
      </header>

      {/* 返回导航 */}
      <div className="border-b bg-muted/30">
        <div className="container py-3">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </div>

      {/* 页面标题 */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">退款规则</h1>
          <p className="text-muted-foreground">了解退款申请条件和处理流程</p>
        </div>
      </section>

      {/* 重要提示 */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <Card className="mb-8 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">重要提示</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    本平台为社群内部项目支持安排，不构成投资建议。审核通过不等于平台担保成功。
                    请在支持项目前仔细阅读项目详情页的风险说明和本退款规则，理性支持。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 退款原则 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                退款原则
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">风险自担</p>
                  <p className="text-sm text-muted-foreground">
                    项目执行存在不确定性，支持者需要自行承担项目失败的风险。平台不承诺任何收益，不保证本金安全。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">有条件退款</p>
                  <p className="text-sm text-muted-foreground">
                    退款仅在特定条件下开放，非所有情况均可申请退款。请仔细阅读下面的退款条件。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">权益限制</p>
                  <p className="text-sm text-muted-foreground">
                    已交付数字权益、社群权限、活动席位等，原则上不支持全额退款。具体情况视项目进展而定。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">审核决定</p>
                  <p className="text-sm text-muted-foreground">
                    退款申请由平台管理员审核，根据项目状态、支持金额、交付情况等因素综合判断是否退款及退款比例。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 可申请退款的情况 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                可申请退款的情况
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">情况1</Badge>
                    <h3 className="font-semibold">项目未达标</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目结项时未达到承诺的验证标准，且差距较大。支持者可申请全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">情况2</Badge>
                    <h3 className="font-semibold">长期失联</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目发起人连续30天以上未更新进展，且无法联系到发起人。支持者可申请全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">情况3</Badge>
                    <h3 className="font-semibold">严重偏离承诺</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目执行过程中，发起人严重偏离项目承诺的方向、目标或时间计划，且未提前说明或征求支持者同意。支持者可申请部分或全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">情况4</Badge>
                    <h3 className="font-semibold">虚假信息</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目申请或更新中包含虚假信息、误导性描述，被平台认定存在欺诈行为。支持者可申请全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">情况5</Badge>
                    <h3 className="font-semibold">项目中止</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目因不可抗力或其他原因中止，且无法继续执行。支持者可申请按项目进度比例退款。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 不予退款的情况 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                不予退款的情况
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">情况1</Badge>
                    <h3 className="font-semibold">已交付数字权益</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目已交付承诺的数字权益（如电子书、课程、软件许可等），且支持者已使用或下载。原则上不支持全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">情况2</Badge>
                    <h3 className="font-semibold">已开通社群权限</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目已承诺并开通社群权限（如VIP群、专属社区等），且支持者已参与社群活动。原则上不支持全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">情况3</Badge>
                    <h3 className="font-semibold">已参与活动</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目已承诺并组织线下或线上活动，且支持者已参加活动。原则上不支持全额退款。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">情况4</Badge>
                    <h3 className="font-semibold">项目正常执行</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目正在正常执行中，发起人定期更新进展，无明显偏差。支持者因个人原因要求退款，不予受理。
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">情况5</Badge>
                    <h3 className="font-semibold">超过申请时限</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">
                    项目结项后超过60天，支持者未提出退款申请。逾期不再受理。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 退款流程 */}
          <Card>
            <CardHeader>
              <CardTitle>退款申请流程</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">提交申请</p>
                    <p className="text-sm text-muted-foreground">
                      登录后，在"我的支持"中找到对应项目，点击"申请退款"，填写退款原因和金额。
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">平台审核</p>
                    <p className="text-sm text-muted-foreground">
                      管理员在3-7个工作日内审核退款申请，根据项目状态和退款规则做出决定。
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">结果通知</p>
                    <p className="text-sm text-muted-foreground">
                      审核结果通过站内信和邮件通知。如同意退款，将在7个工作日内处理退款。
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">资金返还</p>
                    <p className="text-sm text-muted-foreground">
                      退款将原路返回至支付账户，具体到账时间取决于支付渠道的处理速度。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
