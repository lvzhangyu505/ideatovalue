'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Users, 
  Clock, 
  Search, 
  Filter,
  ArrowRight,
  Rocket
} from 'lucide-react';

// 模拟项目数据
const allProjects = [
  {
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
    creator: '张明',
  },
  {
    id: 2,
    title: '社区青少年编程教育计划',
    description: '通过有趣的项目式学习，培养青少年编程思维',
    category: '内容型',
    phase: '小规模交付阶段',
    status: '执行中',
    progress: 92,
    supporters: 234,
    daysLeft: 5,
    targetAmount: 30000,
    currentAmount: 27600,
    creator: '李华',
  },
  {
    id: 3,
    title: '环保材料研发实验室',
    description: '开发可降解包装材料，减少塑料污染',
    category: '产品型',
    phase: '验证阶段',
    status: '执行中',
    progress: 45,
    supporters: 89,
    daysLeft: 25,
    targetAmount: 80000,
    currentAmount: 36000,
    creator: '王芳',
  },
  {
    id: 4,
    title: '远程办公协作工具',
    description: '专为分布式团队设计的轻量级协作平台',
    category: '产品型',
    phase: '灵感阶段',
    status: '审核中',
    progress: 0,
    supporters: 0,
    daysLeft: 0,
    targetAmount: 0,
    currentAmount: 0,
    creator: '赵强',
  },
  {
    id: 5,
    title: '乡村文化纪录片',
    description: '记录即将消失的乡村传统与文化',
    category: '内容型',
    phase: '灵感阶段',
    status: '审核中',
    progress: 0,
    supporters: 0,
    daysLeft: 0,
    targetAmount: 0,
    currentAmount: 0,
    creator: '刘洋',
  },
  {
    id: 6,
    title: 'AI 辅助写作助手',
    description: '帮助创作者突破写作瓶颈的工具',
    category: '服务型',
    phase: '验证阶段',
    status: '执行中',
    progress: 67,
    supporters: 123,
    daysLeft: 15,
    targetAmount: 40000,
    currentAmount: 26800,
    creator: '陈晨',
  },
  {
    id: 7,
    title: '社区共享厨房',
    description: '为社区居民提供共享烹饪空间和厨具',
    category: '活动型',
    phase: '原型阶段',
    status: '预警中',
    progress: 45,
    supporters: 67,
    daysLeft: 8,
    targetAmount: 25000,
    currentAmount: 11250,
    creator: '周婷',
  },
  {
    id: 8,
    title: '可持续时尚品牌',
    description: '使用回收材料制作的时尚服装品牌',
    category: '产品型',
    phase: '小规模交付阶段',
    status: '已结项',
    progress: 100,
    supporters: 312,
    daysLeft: 0,
    targetAmount: 100000,
    currentAmount: 115000,
    creator: '吴敏',
  },
];

const statusColors: Record<string, string> = {
  '审核中': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  '已立项': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  '执行中': 'bg-green-100 text-green-800 hover:bg-green-100',
  '预警中': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  '已结项': 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  '已中止': 'bg-red-100 text-red-800 hover:bg-red-100',
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // 筛选逻辑
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesPhase = selectedPhase === 'all' || project.phase === selectedPhase;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPhase;
  });

  // 排序逻辑
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return b.id - a.id;
      case 'popular':
        return b.supporters - a.supporters;
      case 'ending':
        return a.daysLeft - b.daysLeft;
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

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
              <Link href="/projects" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all">
                浏览项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
                平台介绍
              </Link>
            </nav>

            {/* 右侧操作区 */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
                  登录
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105">
                  注册
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 页面标题 */}
      <section className="border-b border-purple-100/50 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 dark:from-slate-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
            浏览项目
          </h1>
          <p className="text-slate-600 dark:text-slate-400">发现并支持优秀的共创项目，开启你的创意之旅</p>
        </div>
      </section>

      {/* 筛选和搜索 */}
      <section className="border-b border-purple-100/50 dark:border-purple-900/30 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="搜索项目名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50 focus:ring-2 focus:ring-purple-400/50 transition-all rounded-full"
              />
            </div>

            {/* 筛选条件 */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50">
                  <SelectValue placeholder="项目状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="审核中">审核中</SelectItem>
                  <SelectItem value="已立项">已立项</SelectItem>
                  <SelectItem value="执行中">执行中</SelectItem>
                  <SelectItem value="预警中">预警中</SelectItem>
                  <SelectItem value="已结项">已结项</SelectItem>
                  <SelectItem value="已中止">已中止</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="项目类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="内容型">内容型</SelectItem>
                  <SelectItem value="活动型">活动型</SelectItem>
                  <SelectItem value="产品型">产品型</SelectItem>
                  <SelectItem value="服务型">服务型</SelectItem>
                  <SelectItem value="社群实验型">社群实验型</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="成熟度阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  <SelectItem value="灵感阶段">灵感阶段</SelectItem>
                  <SelectItem value="验证阶段">验证阶段</SelectItem>
                  <SelectItem value="原型阶段">原型阶段</SelectItem>
                  <SelectItem value="小规模交付阶段">小规模交付阶段</SelectItem>
                  <SelectItem value="可复制阶段">可复制阶段</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">最新发布</SelectItem>
                  <SelectItem value="popular">热门支持</SelectItem>
                  <SelectItem value="ending">即将截止</SelectItem>
                  <SelectItem value="progress">进度最高</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="py-8">
        <div className="container">
          {/* 结果统计 */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              找到 <span className="font-semibold text-foreground">{sortedProjects.length}</span> 个项目
            </p>
          </div>

          {/* 项目卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] flex flex-col rounded-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 flex items-center justify-center group-hover:from-purple-200/50 group-hover:via-pink-200/50 group-hover:to-blue-200/50 dark:group-hover:from-purple-800/40 dark:group-hover:via-pink-800/40 dark:group-hover:to-blue-800/40 transition-all duration-500">
                  <div className="text-4xl">🎯</div>
                </div>
                <CardHeader className="flex-1 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge 
                      variant="secondary" 
                      className={statusColors[project.status]}
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="border-purple-200/50 dark:border-purple-800/50 text-slate-600 dark:text-slate-400">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 mb-2 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">{project.description}</p>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    发起人：{project.creator}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    {project.status === '执行中' || project.status === '预警中' ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-500">项目进度</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{project.supporters} 人支持</span>
                          </div>
                          {project.daysLeft > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>{project.daysLeft} 天剩余</span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {project.phase}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/projects/${project.id}`} className="w-full">
                    <Button 
                      variant={project.status === '执行中' ? 'default' : 'outline'} 
                      className={`w-full ${project.status === '执行中' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 border-0' 
                        : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:scale-105'
                      } transition-all`}
                    >
                      查看详情
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* 空状态 */}
          {sortedProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <span className="text-5xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                没有找到匹配的项目
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                尝试调整筛选条件或搜索关键词
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedCategory('all');
                  setSelectedPhase('all');
                }}
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-full"
              >
                清除筛选条件
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
