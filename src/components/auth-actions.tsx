'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bell, FolderKanban, LogOut, ShieldCheck, UserRound } from 'lucide-react';

import { useAuthUser } from '@/hooks/use-auth-user';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function getDisplayName(email: string | undefined, metadataName: unknown) {
  if (typeof metadataName === 'string' && metadataName.trim()) {
    return metadataName.trim();
  }

  if (!email) {
    return '我的账户';
  }

  return email.split('@')[0] || '我的账户';
}

function getInitials(name: string) {
  const normalized = name.trim();

  if (!normalized) {
    return '我';
  }

  if (normalized.length === 1) {
    return normalized;
  }

  return normalized.slice(0, 2).toUpperCase();
}

const ADMIN_NOTIFICATIONS_READ_KEY = 'ideatovalue.admin-notifications-read-at';

export function AuthActions() {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const [unreadAdminCount, setUnreadAdminCount] = useState(0);

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = Boolean(user?.email && adminEmails.includes(user.email.trim().toLowerCase()));

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      router.push('/');
      router.refresh();
      return;
    }

    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    if (!user || !isAdmin) {
      setUnreadAdminCount(0);
      return;
    }

    let isMounted = true;

    async function loadUnreadAdminCount() {
      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { session },
        } = (await supabase?.auth.getSession()) ?? { data: { session: null } };

        if (!session?.access_token || !isMounted) {
          return;
        }

        const response = await fetch('/api/admin/project-submissions', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok || !isMounted) {
          return;
        }

        const result = (await response.json()) as {
          submissions?: Array<{ updated_at: string }>;
        };

        const lastReadAt =
          typeof window !== 'undefined'
            ? Number.parseInt(window.localStorage.getItem(ADMIN_NOTIFICATIONS_READ_KEY) || '0', 10)
            : 0;

        const unreadItems = (result.submissions || []).filter((submission) => {
          const updatedAt = new Date(submission.updated_at).getTime();
          return !lastReadAt || updatedAt > lastReadAt;
        });

        setUnreadAdminCount(unreadItems.length);
      } catch (error) {
        console.error('读取管理员未读通知失败:', error);
      }
    }

    void loadUnreadAdminCount();

    return () => {
      isMounted = false;
    };
  }, [isAdmin, user]);

  if (isLoading) {
    return <div className="h-10 w-24 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 transition-all hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
          >
            登录
          </Button>
        </Link>
        <Link href="/register">
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/40"
          >
            注册
          </Button>
        </Link>
      </div>
    );
  }

  const displayName = getDisplayName(user.email, user.user_metadata.display_name);
  const avatarUrl =
    typeof user.user_metadata.avatar_url === 'string' ? user.user_metadata.avatar_url : '';

  return (
    <div className="flex items-center gap-3">
      {isAdmin ? (
        <Link
          href="/admin"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem(ADMIN_NOTIFICATIONS_READ_KEY, String(Date.now()));
            }
            setUnreadAdminCount(0);
          }}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-purple-200/60 bg-white/80 text-slate-700 shadow-lg shadow-purple-500/10 transition-all hover:border-purple-300 hover:bg-white dark:border-purple-800/40 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-purple-700"
          aria-label="审核通知"
        >
          <Bell className="h-4 w-4" />
          {unreadAdminCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-1.5 text-[10px] font-semibold text-white">
              {unreadAdminCount > 99 ? '99+' : unreadAdminCount}
            </span>
          ) : null}
        </Link>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-3 rounded-full border border-purple-200/60 bg-white/80 px-2 py-1.5 text-left shadow-lg shadow-purple-500/10 transition-all hover:border-purple-300 hover:bg-white dark:border-purple-800/40 dark:bg-slate-900/80 dark:hover:border-purple-700 dark:hover:bg-slate-900"
          >
            <Avatar className="size-9 ring-2 ring-purple-200/70 dark:ring-purple-800/60">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold text-white">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden pr-2 sm:block">
              <div className="max-w-28 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                {displayName}
              </div>
              <div className="max-w-28 truncate text-xs text-slate-500 dark:text-slate-400">
                个人中心
              </div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 rounded-2xl border-purple-100/70 bg-white/95 p-2 backdrop-blur-xl dark:border-purple-900/40 dark:bg-slate-950/95">
        <DropdownMenuLabel className="space-y-1 px-3 py-2">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{displayName}</div>
          <div className="truncate text-xs font-normal text-slate-500 dark:text-slate-400">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="rounded-xl px-3 py-2">
          <Link href="/profile">
            <UserRound className="h-4 w-4" />
            查看我的资料
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl px-3 py-2">
          <Link href="/start">
            <FolderKanban className="h-4 w-4" />
            发起新项目
          </Link>
        </DropdownMenuItem>
        {isAdmin ? (
          <DropdownMenuItem asChild className="rounded-xl px-3 py-2">
            <Link href="/admin">
              <ShieldCheck className="h-4 w-4" />
              审核后台
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-xl px-3 py-2 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
          onClick={() => {
            void handleSignOut();
          }}
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
