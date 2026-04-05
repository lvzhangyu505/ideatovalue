'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, CheckCircle2, Loader2, Search, ShieldAlert, XCircle } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { getProjectSubcategoryOptions, PROJECT_TYPE_LABELS, PROJECT_TYPE_OPTIONS } from '@/lib/project-applications';
import {
  type ProjectSubmissionRecord,
  getSubmissionStatusLabel,
  normalizeProgressUpdates,
} from '@/lib/project-submissions';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const { user, isLoading, isConfigured } = useAuthUser();
  const [submissions, setSubmissions] = useState<ProjectSubmissionRecord[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reviewNote, setReviewNote] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const isAdmin = useMemo(() => {
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    return Boolean(user?.email && adminEmails.includes(user.email.trim().toLowerCase()));
  }, [user?.email]);

  async function loadSubmissions() {
    try {
      setError('');
      const supabase = getSupabaseBrowserClient();
      const {
        data: { session },
      } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

      if (!session?.access_token) {
        setError('当前登录状态已失效，请重新登录。');
        return;
      }

      const response = await fetch('/api/admin/project-submissions', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const result = (await response.json()) as {
        message?: string;
        submissions?: ProjectSubmissionRecord[];
      };

      if (!response.ok) {
        setError(result.message || '读取审核列表失败。');
        return;
      }

      setSubmissions(result.submissions || []);
    } catch (fetchError) {
      console.error('读取审核列表失败:', fetchError);
      setError('读取审核列表失败，请稍后重试。');
    }
  }

  useEffect(() => {
    if (!user || !isAdmin) {
      return;
    }

    void loadSubmissions();
  }, [isAdmin, user]);

  useEffect(() => {
    if (!user || !isAdmin || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('ideatovalue.admin-notifications-read-at', String(Date.now()));
  }, [isAdmin, user, submissions.length]);

  async function handleReview(submissionId: string, status: 'approved' | 'rejected') {
    try {
      setSubmittingId(submissionId);
      setError('');
      setSuccessMessage('');

      const supabase = getSupabaseBrowserClient();
      const {
        data: { session },
      } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

      if (!session?.access_token) {
        setError('当前登录状态已失效，请重新登录。');
        return;
      }

      const response = await fetch('/api/admin/project-submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          submissionId,
          status,
          reviewNote: reviewNote[submissionId] || '',
        }),
      });

      const result = (await response.json()) as { message?: string; mailSent?: boolean };
      if (!response.ok) {
        setError(result.message || '审核操作失败。');
        return;
      }

      setSuccessMessage(
        result.message ||
          (result.mailSent ? '审核已完成，通知邮件已发送。' : '审核已完成，但通知邮件未发送。')
      );
      await loadSubmissions();
    } catch (reviewError) {
      console.error('审核操作失败:', reviewError);
      setError('审核操作失败，请稍后重试。');
    } finally {
      setSubmittingId('');
    }
  }

  const pendingSubmissions = submissions.filter((submission) => submission.status === 'pending');
  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
      const matchesType = typeFilter === 'all' || submission.project_type === typeFilter;
      const matchesSearch =
        !normalizedQuery ||
        submission.project_name.toLowerCase().includes(normalizedQuery) ||
        submission.user_name.toLowerCase().includes(normalizedQuery) ||
        submission.user_email.toLowerCase().includes(normalizedQuery) ||
        submission.description.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [searchQuery, statusFilter, submissions, typeFilter]);

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
                管理后台
              </span>
            </Link>

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
            项目审核后台
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">审核注册用户提交的项目申请，通过后项目会自动进入公开发现页。</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="h-40 rounded-3xl bg-white/60 dark:bg-slate-900/60" />
          ) : !isConfigured ? (
            <Card className="mx-auto max-w-2xl rounded-3xl border-amber-200/60 bg-white/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  登录功能尚未配置完成
                </CardTitle>
                <CardDescription>
                  当前部署还没有拿到 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`，请确认它们已经加到正在服务你域名的 Vercel 项目里，并重新部署。
                </CardDescription>
              </CardHeader>
            </Card>
          ) : !user ? (
            <Card className="mx-auto max-w-2xl rounded-3xl border-purple-100/50 bg-white/70 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle>请先登录管理员账号</CardTitle>
                <CardDescription>登录后才能查看待审核项目列表。</CardDescription>
              </CardHeader>
            </Card>
          ) : !isAdmin ? (
            <Card className="mx-auto max-w-2xl rounded-3xl border-red-200/60 bg-white/70 shadow-xl shadow-red-500/10 backdrop-blur-xl dark:border-red-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  当前账号没有管理权限
                </CardTitle>
                <CardDescription>
                  请把你的邮箱加入 `ADMIN_EMAILS` 环境变量，例如 `lux932519@gmail.com`。
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader className="pb-2">
                    <CardDescription>待审核</CardDescription>
                    <CardTitle className="text-3xl">{pendingSubmissions.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader className="pb-2">
                    <CardDescription>已通过</CardDescription>
                    <CardTitle className="text-3xl">{submissions.filter((item) => item.status === 'approved').length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="rounded-2xl border-purple-100/50 bg-white/70 dark:border-purple-900/30 dark:bg-slate-900/70">
                  <CardHeader className="pb-2">
                    <CardDescription>未通过</CardDescription>
                    <CardTitle className="text-3xl">{submissions.filter((item) => item.status === 'rejected').length}</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                  {successMessage}
                </div>
              ) : null}

              <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="搜索项目名、发起人、邮箱或简介..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-11 rounded-full border-purple-200/60 bg-white/85 pl-10 dark:border-purple-800/50 dark:bg-slate-900/75"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'all' | 'pending' | 'approved' | 'rejected')}>
                    <SelectTrigger className="w-full rounded-full bg-white/85 lg:w-[180px] dark:bg-slate-900/75">
                      <SelectValue placeholder="审核状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="pending">审核中</SelectItem>
                      <SelectItem value="approved">已通过</SelectItem>
                      <SelectItem value="rejected">未通过</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full rounded-full bg-white/85 lg:w-[180px] dark:bg-slate-900/75">
                      <SelectValue placeholder="项目类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      {PROJECT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <div className="grid gap-5">
                {filteredSubmissions.length === 0 ? (
                  <Card className="rounded-3xl border border-dashed border-purple-200/70 bg-white/70 p-10 text-center shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
                    <div className="text-sm text-slate-500 dark:text-slate-400">当前筛选条件下没有匹配的项目申请。</div>
                  </Card>
                ) : null}
                {filteredSubmissions.map((submission) => {
                  const progressUpdates = normalizeProgressUpdates(submission.progress_updates);
                  const latestProgressUpdate = progressUpdates[0];

                  return (
                  <Card key={submission.id} className="rounded-3xl border-purple-100/50 bg-white/70 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
                    <CardHeader>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-2xl">{submission.project_name}</CardTitle>
                            <Badge variant="outline">{PROJECT_TYPE_LABELS[submission.project_type] ?? submission.project_type}</Badge>
                            <Badge variant="outline">
                              {getProjectSubcategoryOptions(submission.project_type).find(
                                (item) => item.value === submission.project_subcategory
                              )?.label ?? submission.project_subcategory}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                              {getSubmissionStatusLabel(submission.status)}
                            </Badge>
                          </div>
                          <CardDescription>
                            发起人：{submission.user_name} · {submission.user_email}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                            <span>展示阶段：{getDiscoveryStageLabel(submission.public_stage)}</span>
                            <span>推荐标签：{submission.badge_label || '平台审核通过'}</span>
                            <span>进度：{submission.completion_rate}%</span>
                            {latestProgressUpdate ? (
                              <span className="text-purple-600 dark:text-purple-300">发起人最近更新了项目进度</span>
                            ) : submission.updated_at !== submission.created_at ? (
                              <span className="text-purple-600 dark:text-purple-300">发起人最近补充过公开信息</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          提交于 {new Date(submission.created_at).toLocaleString('zh-CN')}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">项目简介</div>
                          <div className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{submission.description}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">项目目标</div>
                          <div className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{submission.goal}</div>
                        </div>
                      </div>

                      {latestProgressUpdate ? (
                        <div className="rounded-2xl border border-purple-200/70 bg-purple-50/60 p-4 dark:border-purple-900/40 dark:bg-purple-950/20">
                          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                            <Activity className="h-4 w-4 text-purple-500" />
                            最新项目进度
                          </div>
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {latestProgressUpdate.title}
                          </div>
                          <div className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                            {latestProgressUpdate.details}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>{new Date(latestProgressUpdate.recordedAt).toLocaleString('zh-CN')}</span>
                            <span>进度：{latestProgressUpdate.completionRate}%</span>
                            <span>支持人数：{latestProgressUpdate.supporterCount}</span>
                            <span>剩余时间：{latestProgressUpdate.daysLeft} 天</span>
                          </div>
                        </div>
                      ) : null}

                      <div className="rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-950/60">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">审核备注</div>
                        <Textarea
                          className="mt-3"
                          rows={3}
                          value={reviewNote[submission.id] || submission.review_note || ''}
                          onChange={(event) =>
                            setReviewNote((current) => ({
                              ...current,
                              [submission.id]: event.target.value,
                            }))
                          }
                          placeholder="可选：补充审核意见"
                        />
                      </div>

                      {submission.status === 'pending' ? (
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => handleReview(submission.id, 'approved')}
                            disabled={submittingId === submission.id}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                          >
                            {submittingId === submission.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                            通过并公开
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReview(submission.id, 'rejected')}
                            disabled={submittingId === submission.id}
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/40 dark:text-red-300 dark:hover:bg-red-950/20"
                          >
                            {submittingId === submission.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                            驳回
                          </Button>
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {submission.reviewer_email ? `审核人：${submission.reviewer_email}` : null}
                          {submission.reviewed_at ? ` · 审核时间：${new Date(submission.reviewed_at).toLocaleString('zh-CN')}` : null}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
