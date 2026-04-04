'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthActions } from '@/components/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Rocket, 
  Users, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Shield,
  ArrowLeft,
  Share2,
  Heart,
  BookOpen
} from 'lucide-react';

// 模拟项目数据
const project = {
  id: 1,
  title: '智慧农业物联网系统',
  description: '为小型农场提供低成本的智能监控与自动化控制方案',
  category: '产品型',
  phase: '原型阶段',
  status: '执行中',
  progress: 78,
  supporters: 156,
  daysLeft: 12,
  targetAmount: 50000,
  currentAmount: 39000,
  creator: {
    name: '张明',
    avatar: '/api/placeholder/40/40',
    bio: '农业技术专家，10年物联网开发经验',
    projects: 3,
  },
  startDate: '2025-01-15',
  endDate: '2025-04-15',
  
  // 项目逻辑闭环
  logic: {
    goal: '开发一套低成本、易安装的农业物联网监控系统，帮助小型农场实现智能化管理',
    problem: '小型农场缺乏有效的监控手段，无法及时发现作物生长异常，导致产量损失',
    audience: '中小型农场主、农业合作社、城市农业爱好者',
    solution: '通过传感器网络收集环境数据，云端分析处理，手机端实时监控和预警',
    verification: '系统稳定运行3个月，覆盖50个农场，准确率达到95%以上',
  },
  
  // 资源与风险
  resources: {
    existing: '已掌握核心技术、完成初步原型设计、获得5个试点农场合作意向',
    needed: '硬件设备采购资金、服务器资源、市场推广支持',
    risks: [
      '传感器精度可能受环境影响',
      '部分农场主可能不熟悉技术操作',
      '初期投入成本可能较高',
    ],
    responses: [
      '采用多传感器融合技术提高精度',
      '提供简单易用的操作界面和培训',
      '采用模块化设计，农场主可以按需配置',
    ],
  },
  
  // 审核信息
  audit: {
    preliminaryPassed: true,
    coCreationPassed: true,
    expert: '王教授（农业自动化专家）',
    reviewer: '项目观察组A组',
    summary: '项目逻辑完整，技术方案可行，风险可控，建议立项支持',
  },
  
  // 支持档位
  tiers: [
    {
      id: 1,
      name: '轻支持档',
      amount: 9.9,
      type: '现金',
      benefits: [
        '项目进展定期更新',
        '最终成果电子报告',
        '项目贡献者证书',
      ],
      quantity: 999,
      delivery: '项目结项后7天内',
      deliveryMethod: '邮件发送',
      refundable: true,
      refundCondition: '项目未成功结项可全额退款',
      shipping: false,
      note: '感谢您的支持',
    },
    {
      id: 2,
      name: '早鸟体验档',
      amount: 99,
      type: '现金',
      benefits: [
        '包含轻支持档所有权益',
        '优先体验Beta版系统',
        '专属微信群讨论',
        '项目定制化建议反馈权',
      ],
      quantity: 50,
      currentSupporters: 45,
      delivery: '2025年3月',
      deliveryMethod: '在线服务',
      refundable: true,
      refundCondition: 'Beta版体验后7天内可申请退款',
      shipping: false,
      note: '早鸟名额有限，先到先得',
    },
    {
      id: 3,
      name: '深度体验档',
      amount: 299,
      type: '现金',
      benefits: [
        '包含早鸟体验档所有权益',
        '完整版系统1年使用权',
        '3个传感器设备',
        '远程技术指导',
      ],
      quantity: 100,
      currentSupporters: 78,
      delivery: '2025年4月',
      deliveryMethod: '快递配送',
      refundable: false,
      refundCondition: '设备发货后不支持退款',
      shipping: true,
      note: '适合实际使用的农场主',
    },
    {
      id: 4,
      name: '联合共创席位',
      amount: 999,
      type: '现金',
      benefits: [
        '包含深度体验档所有权益',
        '产品共创讨论参与权',
        '核心功能优先测试权',
        '项目决策建议反馈权',
        '联合署名展示',
        '年度共创聚会邀请',
      ],
      quantity: 10,
      currentSupporters: 8,
      delivery: '项目全程',
      deliveryMethod: '在线服务',
      refundable: false,
      refundCondition: '参与共创后不支持退款',
      shipping: false,
      note: '提供的是参与权、反馈权、讨论权，不等于分红权、控制权、收益权',
    },
  ],
  
  // 阶段更新
  updates: [
    {
      id: 1,
      date: '2025-02-28',
      phase: '原型验证阶段',
      completed: [
        '完成传感器数据采集模块开发',
        '实现云端数据存储和分析',
        '开发移动端监控界面',
      ],
      data: '5个试点农场已完成设备安装，数据采集准确率达到92%',
      obstacle: '部分传感器在低温环境下精度略有下降',
      nextAction: '优化传感器算法，增加温度补偿功能',
    },
    {
      id: 2,
      date: '2025-02-15',
      phase: '初步开发阶段',
      completed: [
        '完成系统架构设计',
        '搭建云端服务器环境',
        '完成核心算法验证',
      ],
      data: '完成3个农场的现场调研',
      obstacle: '网络信号在部分农场覆盖不足',
      nextAction: '采用LoRa通信技术解决网络问题',
    },
    {
      id: 3,
      date: '2025-01-30',
      phase: '需求分析阶段',
      completed: [
        '完成10位农场主访谈',
        '整理核心需求清单',
        '制定开发计划',
      ],
      data: '识别出5个核心功能需求',
      obstacle: '部分需求优先级不明确',
      nextAction: '与农场主共同制定优先级',
    },
  ],
  
  // 结项信息（如果已结项）
  conclusion: null,
};

export default function ProjectDetailPage() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
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
            </nav>

            {/* 右侧操作区 */}
            <AuthActions />
          </div>
        </div>
      </header>

      {/* 返回导航 */}
      <div className="border-b bg-muted/30">
        <div className="container py-3">
          <Link href="/projects" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            返回项目列表
          </Link>
        </div>
      </div>

      {/* 项目头部信息 */}
      <section className="border-b">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：项目主信息 */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="outline">{project.phase}</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{project.status}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              {/* 发起人信息 */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{project.creator.name}</div>
                  <div className="text-sm text-muted-foreground">{project.creator.bio}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  发起 {project.creator.projects} 个项目
                </div>
              </div>

              {/* 项目进度 */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      ¥{project.currentAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      目标 ¥{project.targetAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{project.progress}%</div>
                    <div className="text-sm text-muted-foreground">
                      {project.supporters} 人支持
                    </div>
                  </div>
                </div>
                <Progress value={project.progress} />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>剩余 {project.daysLeft} 天</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                </div>
              </div>

              {/* 项目详情标签页 */}
              <Tabs defaultValue="logic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="logic">项目逻辑</TabsTrigger>
                  <TabsTrigger value="updates">阶段更新</TabsTrigger>
                  <TabsTrigger value="audit">审核信息</TabsTrigger>
                  <TabsTrigger value="risk">资源风险</TabsTrigger>
                  <TabsTrigger value="conclusion">结项复盘</TabsTrigger>
                </TabsList>
                
                <TabsContent value="logic" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        项目逻辑闭环
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">项目目标</h4>
                        <p className="text-muted-foreground">{project.logic.goal}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">要解决的问题</h4>
                        <p className="text-muted-foreground">{project.logic.problem}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">面向对象/受众</h4>
                        <p className="text-muted-foreground">{project.logic.audience}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">方案路径</h4>
                        <p className="text-muted-foreground">{project.logic.solution}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">验证标准</h4>
                        <p className="text-muted-foreground">{project.logic.verification}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="updates" className="mt-6 space-y-6">
                  {project.updates.map((update) => (
                    <Card key={update.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-primary" />
                              {update.phase}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-2">
                              <Calendar className="h-4 w-4" />
                              {update.date}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            本阶段已完成事项
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {update.completed.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">关键数据/反馈</h4>
                          <p className="text-muted-foreground">{update.data}</p>
                        </div>
                        <Separator />
                        {update.obstacle && (
                          <>
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                当前最大障碍
                              </h4>
                              <p className="text-muted-foreground">{update.obstacle}</p>
                            </div>
                            <Separator />
                          </>
                        )}
                        <div>
                          <h4 className="font-semibold mb-2">下一阶段动作</h4>
                          <p className="text-muted-foreground">{update.nextAction}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="audit" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        审核与共创机制
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">平台初审</span>
                        <Badge variant={project.audit.preliminaryPassed ? 'default' : 'destructive'}>
                          {project.audit.preliminaryPassed ? '✓ 已通过' : '✗ 未通过'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">共创审核</span>
                        <Badge variant={project.audit.coCreationPassed ? 'default' : 'destructive'}>
                          {project.audit.coCreationPassed ? '✓ 已通过' : '✗ 未通过'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">共创指导位</h4>
                          <p className="text-sm text-muted-foreground">{project.audit.expert}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">项目观察组</h4>
                          <p className="text-sm text-muted-foreground">{project.audit.reviewer}</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">审核摘要</h4>
                        <p className="text-muted-foreground">{project.audit.summary}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="risk" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        资源与风险
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">当前已有资源</h4>
                        <p className="text-muted-foreground">{project.resources.existing}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">当前仍需支持</h4>
                        <p className="text-muted-foreground">{project.resources.needed}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">关键风险</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {project.resources.risks.map((risk, index) => (
                            <li key={index}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">应对思路</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {project.resources.responses.map((response, index) => (
                            <li key={index}>{response}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="conclusion" className="mt-6">
                  {project.conclusion ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>结项复盘</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* 结项内容 */}
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>项目尚未结项，结项后将在此展示复盘内容</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* 右侧：支持档位 */}
            <div className="space-y-4">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4">支持档位</h2>
                <div className="space-y-4">
                  {project.tiers.map((tier) => (
                    <Card key={tier.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{tier.name}</CardTitle>
                            <CardDescription>
                              ¥{tier.amount.toLocaleString()}
                              {tier.quantity > 0 && `（剩余 ${tier.quantity - (tier.currentSupporters || 0)} 个）`}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <ul className="space-y-2 text-sm">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Separator />
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div>预计交付：{tier.delivery}</div>
                          <div>交付方式：{tier.deliveryMethod}</div>
                          {tier.shipping && <div>含运费</div>}
                          {tier.note && (
                            <div className="text-orange-600 mt-2">
                              {tier.note}
                            </div>
                          )}
                          <div className={tier.refundable ? 'text-green-600' : 'text-red-600'}>
                            {tier.refundable ? `✓ ${tier.refundCondition}` : '✗ 不支持退款'}
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedTier(tier.id)}
                          disabled={tier.quantity > 0 && (tier.currentSupporters || 0) >= tier.quantity}
                        >
                          {tier.quantity > 0 && (tier.currentSupporters || 0) >= tier.quantity
                            ? '已售罄'
                            : '立即支持'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 固定声明区 */}
      <section className="border-t bg-muted/30 py-8">
        <div className="container">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>非投资声明：</strong>本平台为社群内部项目支持安排，不构成投资建议。审核通过不等于平台担保成功。</span>
                </p>
                <p className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>非担保声明：</strong>支持项目是基于回报型支持，不承诺收益，不涉及分红，不保证本金安全。</span>
                </p>
                <p className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>发起人责任：</strong>项目发起人对项目承诺的真实性、可行性承担全部责任。</span>
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Link href="/refund" className="text-primary hover:underline">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    查看完整退款规则
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
