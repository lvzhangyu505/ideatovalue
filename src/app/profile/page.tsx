'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  FolderKanban,
  Mail,
  Rocket,
  UserRound,
  CalendarClock,
  ShieldCheck,
} from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthUser } from '@/hooks/use-auth-user';
import {
  type StoredProjectApplication,
  getStoredProjectApplications,
  PROJECT_TYPE_LABELS,
} from '@/lib/project-applications';

function getDisplayName(email: string | undefined, metadataName: unknown) {
  if (typeof metadataName === 'string' && metadataName.trim()) {
    return metadataName.trim();
  }

  if (!email) {
    return '未设置昵称';
  }

  return email.split('@')[0] || '未设置昵称';
}

function getInitials(name: string) {
  const normalized = name.trim();

  if (!normalized) {
    return '我';
  }

  return normalized.slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const { user, isLoading } = useAuthUser();
  const [applications, setApplications] = useState<StoredProjectApplication[]>([]);

  useEffect(() => {
    setApplications(getStoredProjectApplications(user?.email));
  }, [user?.email]);

  const displayName = getDisplayName(user?.email, user?.user_metadata.display_name);
  const avatarUrl =
    typeof user?.user_metadata.avatar_url === 'string' ? user.user_metadata.avatar_url : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-purple-900/30 dark:bg-slate-950/70">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-90 blur-[2px]" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400" />
                <div className="absolute inset-2 rounded-full bg-white/40 backdrop-blur-sm dark:bg-white/20" />
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
              <Link href="/profile" className="text-sm font-medium text-purple-600 transition-all hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                我的资料
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
          <h1 className="bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-3xl font-bold text-transparent dark:from-slate-100 dark:via-purple-300 dark:to-blue-300 md:text-4xl">
            我的资料
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">在这里查看你的基础信息、项目申请记录和当前账户状态。</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
              <div className="h-80 rounded-3xl bg-white/60 dark:bg-slate-900/60" />
              <div className="h-80 rounded-3xl bg-white/60 dark:bg-slate-900/60" />
            </div>
          ) : !user ? (
            <Card className="mx-auto max-w-2xl rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-2xl">先登录，再查看个人中心</CardTitle>
                <CardDescription>登录后右上角会显示你的头像，你可以随时进入个人资料页查看基础信息和我的项目。</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button>去登录</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">去注册</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
              <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                <CardHeader className="items-center text-center">
                  <Avatar className="size-24 ring-4 ring-purple-200/60 dark:ring-purple-800/50">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-2xl font-semibold text-white">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 pt-3">
                    <CardTitle className="text-2xl">{displayName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="rounded-2xl border border-purple-100/70 bg-purple-50/70 p-4 dark:border-purple-900/40 dark:bg-purple-950/20">
                    <div className="mb-2 flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                      <ShieldCheck className="h-4 w-4 text-purple-500" />
                      账户状态
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                      已登录
                    </Badge>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="flex items-start gap-3">
                      <UserRound className="mt-0.5 h-4 w-4 text-purple-500" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">昵称</div>
                        <div>{displayName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-purple-500" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">邮箱</div>
                        <div className="break-all">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CalendarClock className="mt-0.5 h-4 w-4 text-purple-500" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">注册时间</div>
                        <div>{user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '暂未记录'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader className="pb-2">
                      <CardDescription>我的项目</CardDescription>
                      <CardTitle className="text-3xl">{applications.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader className="pb-2">
                      <CardDescription>最近状态</CardDescription>
                      <CardTitle className="text-2xl">{applications[0]?.reviewStatus ?? '暂无'}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader className="pb-2">
                      <CardDescription>最近提交</CardDescription>
                      <CardTitle className="text-lg">
                        {applications[0]?.createdAt
                          ? new Date(applications[0].createdAt).toLocaleDateString('zh-CN')
                          : '暂无记录'}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">我的项目</CardTitle>
                      <CardDescription>这里先展示你在当前设备提交过的项目申请记录，后续接数据库后可以无缝扩展成正式项目后台。</CardDescription>
                    </div>
                    <Link href="/start">
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                        <Rocket className="mr-2 h-4 w-4" />
                        发起项目
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {applications.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-purple-200/70 bg-purple-50/50 p-8 text-center dark:border-purple-900/40 dark:bg-purple-950/10">
                        <FolderKanban className="mx-auto mb-4 h-10 w-10 text-purple-500" />
                        <p className="text-base font-medium text-slate-900 dark:text-slate-100">你还没有项目记录</p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">提交第一份项目申请后，这里会自动出现你的项目卡片。</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {applications.map((application) => (
                          <div
                            key={application.id}
                            className="rounded-2xl border border-purple-100/70 bg-slate-50/80 p-5 transition-all hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 dark:border-purple-900/40 dark:bg-slate-950/50"
                          >
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{application.projectName}</h3>
                                  <Badge variant="outline">{PROJECT_TYPE_LABELS[application.projectType] ?? application.projectType}</Badge>
                                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                    {application.reviewStatus}
                                  </Badge>
                                </div>
                                <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                  {application.description}
                                </p>
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                提交于 {new Date(application.createdAt).toLocaleString('zh-CN')}
                              </div>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
                                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">项目目标</div>
                                <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{application.goal}</div>
                              </div>
                              <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
                                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">当前仍需支持</div>
                                <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{application.neededResources}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
