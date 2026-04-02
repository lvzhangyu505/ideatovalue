'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Settings, 
  BarChart3,
  Search,
  Eye,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';

// 模拟数据
const projects = [
  {
    id: 1,
    name: '智慧农业物联网系统',
    creator: '张明',
    type: '产品型',
    status: '执行中',
    amount: 50000,
    current: 39000,
    supporters: 156,
    createdAt: '2025-01-15',
  },
  {
    id: 2,
    name: '社区青少年编程教育计划',
    creator: '李华',
    type: '内容型',
    status: '审核中',
    amount: 30000,
    current: 0,
    supporters: 0,
    createdAt: '2025-02-20',
  },
  {
    id: 3,
    name: '环保材料研发实验室',
    creator: '王芳',
    type: '产品型',
    status: '预警中',
    amount: 80000,
    current: 36000,
    supporters: 89,
    createdAt: '2025-01-20',
  },
  {
    id: 4,
    name: '远程办公协作工具',
    creator: '赵强',
    type: '产品型',
    status: '已结项',
    amount: 60000,
    current: 72000,
    supporters: 245,
    createdAt: '2024-10-15',
  },
];

const users = [
  {
    id: 1,
    name: '张明',
    email: 'zhangming@example.com',
    role: '发起人',
    projects: 3,
    status: '正常',
    joinedAt: '2024-08-15',
  },
  {
    id: 2,
    name: '李华',
    email: 'lihua@example.com',
    role: '成员',
    projects: 0,
    status: '正常',
    joinedAt: '2024-09-20',
  },
  {
    id: 3,
    name: '王教授',
    email: 'wang@university.edu.cn',
    role: '专家',
    projects: 0,
    reviews: 15,
    status: '正常',
    joinedAt: '2024-07-01',
  },
  {
    id: 4,
    name: '管理员',
    email: 'admin@platform.com',
    role: '管理员',
    status: '正常',
    joinedAt: '2024-06-01',
  },
];

const audits = [
  {
    id: 1,
    projectName: '社区青少年编程教育计划',
    creator: '李华',
    type: '产品型',
    status: '初审中',
    submittedAt: '2025-02-20',
    priority: '高',
  },
  {
    id: 2,
    projectName: '乡村文化纪录片',
    creator: '刘洋',
    type: '内容型',
    status: '共创审核中',
    submittedAt: '2025-02-18',
    priority: '中',
  },
  {
    id: 3,
    projectName: 'AI 辅助写作助手',
    creator: '陈晨',
    type: '服务型',
    status: '待复审',
    submittedAt: '2025-02-10',
    priority: '低',
  },
];

const stats = {
  totalProjects: 128,
  auditingProjects: 12,
  executingProjects: 45,
  completedProjects: 71,
  totalUsers: 1256,
  totalSupporters: 2456,
  totalAmount: 1250000,
  refundRequests: 5,
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">管理后台</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="text-sm font-medium text-primary transition-colors">
                数据概览
              </Link>
              <Link href="/admin/users" className="text-sm font-medium hover:text-primary transition-colors">
                用户管理
              </Link>
              <Link href="/admin/projects" className="text-sm font-medium hover:text-primary transition-colors">
                项目管理
              </Link>
              <Link href="/admin/audits" className="text-sm font-medium hover:text-primary transition-colors">
                审核管理
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline">管理员</Badge>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回前台
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 页面标题 */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">数据看板</h1>
          <p className="text-muted-foreground">平台整体运营数据概览</p>
        </div>
      </section>

      {/* 统计卡片 */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总项目数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  审核中 {stats.auditingProjects} · 执行中 {stats.executingProjects}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">已结项</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completedProjects}</div>
                <p className="text-xs text-muted-foreground">
                  结项率 {((stats.completedProjects / stats.totalProjects) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">支持人次</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSupporters}</div>
                <p className="text-xs text-muted-foreground">
                  涉及金额 ¥{stats.totalAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">退款申请</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.refundRequests}</div>
                <p className="text-xs text-muted-foreground">
                  待处理
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 标签页 */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">项目管理</TabsTrigger>
              <TabsTrigger value="users">用户管理</TabsTrigger>
              <TabsTrigger value="audits">审核管理</TabsTrigger>
              <TabsTrigger value="refunds">退款处理</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>项目列表</CardTitle>
                      <CardDescription>管理所有项目的状态和信息</CardDescription>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="搜索项目..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>项目名称</TableHead>
                        <TableHead>发起人</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>支持进度</TableHead>
                        <TableHead>支持人数</TableHead>
                        <TableHead>创建时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>{project.creator}</TableCell>
                          <TableCell>{project.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                project.status === '执行中' ? 'default' :
                                project.status === '审核中' ? 'secondary' :
                                project.status === '预警中' ? 'destructive' :
                                'outline'
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {project.current > 0 ? (
                              <span>{((project.current / project.amount) * 100).toFixed(0)}%</span>
                            ) : (
                              <span>-</span>
                            )}
                          </TableCell>
                          <TableCell>{project.supporters}</TableCell>
                          <TableCell>{project.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>用户列表</CardTitle>
                  <CardDescription>管理用户账户、角色和权限</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>用户名</TableHead>
                        <TableHead>邮箱</TableHead>
                        <TableHead>角色</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>参与项目</TableHead>
                        <TableHead>注册时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === '管理员' ? 'default' : 'outline'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.projects || user.reviews}</TableCell>
                          <TableCell>{user.joinedAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audits" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>审核队列</CardTitle>
                  <CardDescription>待审核的项目申请</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>项目名称</TableHead>
                        <TableHead>发起人</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>优先级</TableHead>
                        <TableHead>提交时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {audits.map((audit) => (
                        <TableRow key={audit.id}>
                          <TableCell className="font-medium">{audit.projectName}</TableCell>
                          <TableCell>{audit.creator}</TableCell>
                          <TableCell>{audit.type}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{audit.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                audit.priority === '高' ? 'destructive' :
                                audit.priority === '中' ? 'default' :
                                'outline'
                              }
                            >
                              {audit.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{audit.submittedAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                查看
                              </Button>
                              <Button size="sm">
                                审核
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="refunds" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>退款处理</CardTitle>
                  <CardDescription>处理用户的退款申请</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>暂无退款申请</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
