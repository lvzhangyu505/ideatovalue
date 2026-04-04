'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogIn, Mail, ShieldAlert } from 'lucide-react';

import { AuthActions } from '@/components/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('请先填写邮箱和密码。');
      return;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError('登录功能尚未配置完成，请先设置 Supabase 环境变量。');
      return;
    }

    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setSuccess('登录成功，正在跳转...');
    router.push('/');
    router.refresh();
  };

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
                发现项目
              </Link>
              <Link href="/start" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                发起项目
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 transition-all hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400">
                平台介绍
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

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
            <Card className="rounded-3xl border-purple-100/50 bg-white/70 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/70">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <LogIn className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-2xl">登录账户</CardTitle>
                <CardDescription>使用邮箱和密码登录 ideatovalue，继续管理项目与支持记录。</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="请输入注册邮箱"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="请输入密码"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  {success ? (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                      {success}
                    </div>
                  ) : null}

                  {error ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                      {error}
                    </div>
                  ) : null}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? '登录中...' : '立即登录'}
                  </Button>
                </form>

                <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                  还没有账号？{' '}
                  <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200">
                    去注册
                  </Link>
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-3xl border-purple-100/50 bg-white/60 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-900/30 dark:bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-2xl">登录后你可以做什么</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  <p>查看并管理自己的项目申请，跟进审核进度，持续补充项目更新。</p>
                  <p>后续我们也可以继续把“我的支持记录”“我的发起项目”“退出登录”这些账户能力接进去。</p>
                </CardContent>
              </Card>

              {!isSupabaseConfigured() ? (
                <Card className="rounded-2xl border-amber-200/60 bg-amber-50/70 shadow-xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-900/40 dark:bg-amber-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                        <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-amber-900 dark:text-amber-100">还未完成认证配置</CardTitle>
                        <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-200/80">需要先在 Vercel 配置 Supabase 公共环境变量</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                    <p>请在 Vercel 的项目环境变量中补上：</p>
                    <p className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</p>
                    <p className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="rounded-2xl border-blue-100/60 bg-blue-50/70 shadow-xl shadow-blue-500/10 backdrop-blur-xl dark:border-blue-900/40 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                        <Mail className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-blue-900 dark:text-blue-100">邮箱密码登录</CardTitle>
                        <p className="mt-1 text-sm text-blue-800/80 dark:text-blue-200/80">如果注册开启了邮箱确认，请先到邮箱完成验证</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
