'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CalendarClock,
  ExternalLink,
  FolderKanban,
  Loader2,
  Mail,
  PencilLine,
  Rocket,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuthUser } from '@/hooks/use-auth-user';
import { getDiscoveryStageLabel } from '@/lib/project-discovery';
import {
  getProjectSubcategoryOptions,
  PROJECT_BADGE_OPTIONS,
  PROJECT_PUBLIC_STAGE_OPTIONS,
  PROJECT_TYPE_LABELS,
} from '@/lib/project-applications';
import {
  type ProjectSubmissionRecord,
  getSubmissionStatusLabel,
  normalizeStringArray,
  normalizeSupportTiers,
  toPublicProjectId,
} from '@/lib/project-submissions';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type ProjectPublicInfoForm = {
  submissionId: string;
  publicStage: string;
  badgeLabel: string;
  completionRate: string;
  supporterCount: string;
  daysLeft: string;
  supportTiers: string;
  latestUpdates: string;
};

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

function toEditForm(application: ProjectSubmissionRecord): ProjectPublicInfoForm {
  return {
    submissionId: application.id,
    publicStage: application.public_stage || 'supporting',
    badgeLabel: application.badge_label || '平台审核通过',
    completionRate: String(application.completion_rate ?? 0),
    supporterCount: String(application.supporter_count ?? 0),
    daysLeft: String(application.days_left ?? 0),
    supportTiers: normalizeSupportTiers(application.support_tiers)
      .map((tier) => `${tier.amount} 元：${tier.description}`)
      .join('\n'),
    latestUpdates: normalizeStringArray(application.latest_updates).join('\n'),
  };
}

export default function ProfilePage() {
  const { user, isLoading } = useAuthUser();
  const [applications, setApplications] = useState<ProjectSubmissionRecord[]>([]);
  const [editingSubmissionId, setEditingSubmissionId] = useState('');
  const [editForm, setEditForm] = useState<ProjectPublicInfoForm | null>(null);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  async function loadApplications() {
    if (!user) {
      setApplications([]);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { session },
      } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

      if (!session?.access_token) {
        setApplications([]);
        return;
      }

      const response = await fetch('/api/my-project-submissions', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        setApplications([]);
        return;
      }

      const result = (await response.json()) as { submissions?: ProjectSubmissionRecord[] };
      setApplications(result.submissions || []);
    } catch (error) {
      console.error('读取我的项目申请失败:', error);
      setApplications([]);
    }
  }

  useEffect(() => {
    void loadApplications();
  }, [user]);

  async function handleSavePublicInfo() {
    if (!editForm) {
      return;
    }

    setEditError('');
    setEditSuccess('');

    const supabase = getSupabaseBrowserClient();
    const {
      data: { session },
    } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

    if (!session?.access_token) {
      setEditError('当前登录状态已失效，请重新登录。');
      return;
    }

    setIsSavingEdit(true);

    try {
      const response = await fetch('/api/my-project-submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(editForm),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setEditError(result.message || '公开信息更新失败。');
        return;
      }

      setEditSuccess(result.message || '公开信息已更新。');
      await loadApplications();
      setTimeout(() => {
        setEditingSubmissionId('');
        setEditForm(null);
        setEditError('');
        setEditSuccess('');
      }, 800);
    } catch (error) {
      console.error('更新项目公开信息失败:', error);
      setEditError('更新项目公开信息失败，请稍后重试。');
    } finally {
      setIsSavingEdit(false);
    }
  }

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
                发现项目
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
                      <CardTitle className="text-2xl">{applications[0] ? getSubmissionStatusLabel(applications[0].status) : '暂无'}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader className="pb-2">
                      <CardDescription>最近提交</CardDescription>
                      <CardTitle className="text-lg">
                        {applications[0]?.created_at
                          ? new Date(applications[0].created_at).toLocaleDateString('zh-CN')
                          : '暂无记录'}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">我的项目</CardTitle>
                      <CardDescription>这里展示你提交到平台审核队列中的项目，以及最新审核状态。</CardDescription>
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
                                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{application.project_name}</h3>
                                  <Badge variant="outline">{PROJECT_TYPE_LABELS[application.project_type] ?? application.project_type}</Badge>
                                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                    {getSubmissionStatusLabel(application.status)}
                                  </Badge>
                                </div>
                                <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                  {application.description}
                                </p>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                  二级分类：
                                  {getProjectSubcategoryOptions(application.project_type).find(
                                    (item) => item.value === application.project_subcategory
                                  )?.label ?? application.project_subcategory}
                                </div>
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                提交于 {new Date(application.created_at).toLocaleString('zh-CN')}
                              </div>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
                                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">项目目标</div>
                                <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{application.goal}</div>
                              </div>
                              <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
                                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">当前仍需支持</div>
                                <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{application.needed_resources}</div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingSubmissionId(application.id);
                                  setEditForm(toEditForm(application));
                                  setEditError('');
                                  setEditSuccess('');
                                }}
                              >
                                <PencilLine className="mr-2 h-4 w-4" />
                                {normalizeSupportTiers(application.support_tiers).length > 0 ? '编辑公开信息' : '补充公开信息'}
                              </Button>
                              {application.status === 'approved' ? (
                                <Link href={`/projects/${toPublicProjectId(application.id)}`}>
                                  <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    查看项目详情
                                  </Button>
                                </Link>
                              ) : null}
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                展示阶段：{getDiscoveryStageLabel(application.public_stage)}
                                {' · '}
                                推荐标签：{application.badge_label || '平台审核通过'}
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

      <Dialog
        open={Boolean(editingSubmissionId && editForm)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingSubmissionId('');
            setEditForm(null);
            setEditError('');
            setEditSuccess('');
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>补充公开信息</DialogTitle>
            <DialogDescription>发起人可以在这里补充支持档位、最新更新和展示信息，审核通过后的详情页会自动同步。</DialogDescription>
          </DialogHeader>

          {editForm ? (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="publicStage">公开展示阶段</Label>
                  <Select
                    value={editForm.publicStage}
                    onValueChange={(value) => setEditForm((current) => (current ? { ...current, publicStage: value } : current))}
                  >
                    <SelectTrigger id="publicStage">
                      <SelectValue placeholder="请选择展示阶段" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_PUBLIC_STAGE_OPTIONS.map((option) => (
                        <SelectItem key={option.slug} value={option.slug}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="badgeLabel">推荐标签</Label>
                  <Select
                    value={editForm.badgeLabel}
                    onValueChange={(value) => setEditForm((current) => (current ? { ...current, badgeLabel: value } : current))}
                  >
                    <SelectTrigger id="badgeLabel">
                      <SelectValue placeholder="请选择推荐标签" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_BADGE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="completionRate">当前进度（%）</Label>
                  <Input
                    id="completionRate"
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.completionRate}
                    onChange={(event) => setEditForm((current) => (current ? { ...current, completionRate: event.target.value } : current))}
                  />
                </div>
                <div>
                  <Label htmlFor="supporterCount">支持人数</Label>
                  <Input
                    id="supporterCount"
                    type="number"
                    min="0"
                    value={editForm.supporterCount}
                    onChange={(event) => setEditForm((current) => (current ? { ...current, supporterCount: event.target.value } : current))}
                  />
                </div>
                <div>
                  <Label htmlFor="daysLeft">剩余天数</Label>
                  <Input
                    id="daysLeft"
                    type="number"
                    min="0"
                    value={editForm.daysLeft}
                    onChange={(event) => setEditForm((current) => (current ? { ...current, daysLeft: event.target.value } : current))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="supportTiers">支持档位</Label>
                <Textarea
                  id="supportTiers"
                  rows={6}
                  placeholder={'请按每行一个档位填写，例如：\n29 元：感谢支持，获得阶段更新邮件\n99 元：首轮观看资格'}
                  value={editForm.supportTiers}
                  onChange={(event) => setEditForm((current) => (current ? { ...current, supportTiers: event.target.value } : current))}
                />
              </div>

              <div>
                <Label htmlFor="latestUpdates">最新更新</Label>
                <Textarea
                  id="latestUpdates"
                  rows={5}
                  placeholder={'请按每行一条填写，例如：\n已完成第一版原型\n正在招募首批测试用户'}
                  value={editForm.latestUpdates}
                  onChange={(event) => setEditForm((current) => (current ? { ...current, latestUpdates: event.target.value } : current))}
                />
              </div>

              {editError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  {editError}
                </div>
              ) : null}

              {editSuccess ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                  {editSuccess}
                </div>
              ) : null}

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingSubmissionId('');
                    setEditForm(null);
                    setEditError('');
                    setEditSuccess('');
                  }}
                >
                  取消
                </Button>
                <Button onClick={() => void handleSavePublicInfo()} disabled={isSavingEdit}>
                  {isSavingEdit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PencilLine className="mr-2 h-4 w-4" />}
                  保存公开信息
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
