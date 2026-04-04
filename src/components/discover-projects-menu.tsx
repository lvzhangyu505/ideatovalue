'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

import {
  buildDiscoveryHref,
  discoveryCategories,
  getDiscoveryCategory,
} from '@/lib/project-discovery';

type DiscoverProjectsMenuProps = {
  active?: boolean;
};

export function DiscoverProjectsMenu({ active = false }: DiscoverProjectsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(discoveryCategories[0]?.slug ?? 'content');

  const activeCategory = useMemo(
    () => getDiscoveryCategory(activeCategorySlug) ?? discoveryCategories[0],
    [activeCategorySlug]
  );

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-all ${
          active
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400'
        }`}
      >
        发现项目
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-[720px] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-4 transition-all duration-200 ${
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-[30px] border border-purple-100/80 bg-white/95 p-4 shadow-[0_30px_80px_rgba(76,29,149,0.14)] backdrop-blur-2xl dark:border-purple-900/40 dark:bg-slate-950/95">
          <div className="rounded-[24px] bg-gradient-to-br from-white via-purple-50/70 to-blue-50/70 p-5 dark:from-slate-900 dark:via-purple-950/20 dark:to-blue-950/20">
            <div className="mb-5 flex flex-wrap gap-2">
              {discoveryCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={buildDiscoveryHref({ primary: category.slug })}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory.slug === category.slug
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20'
                      : 'border border-purple-100/80 bg-white/90 text-slate-700 hover:border-purple-200 hover:text-purple-700 dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-200 dark:hover:border-purple-800 dark:hover:text-purple-300'
                  }`}
                  onMouseEnter={() => setActiveCategorySlug(category.slug)}
                  onFocus={() => setActiveCategorySlug(category.slug)}
                >
                  {category.label}
                </Link>
              ))}
            </div>

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  二级分类
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {activeCategory.label}
                </h3>
              </div>
              <Link
                href={buildDiscoveryHref({ primary: activeCategory.slug })}
                className="inline-flex items-center gap-1 rounded-full border border-purple-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:border-purple-300 hover:text-purple-800 dark:border-purple-800/60 dark:bg-slate-950/70 dark:text-purple-300 dark:hover:border-purple-700 dark:hover:text-purple-200"
              >
                查看全部
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {activeCategory.secondaryCategories.map((secondary) => (
                <Link
                  key={secondary.slug}
                  href={buildDiscoveryHref({
                    primary: activeCategory.slug,
                    secondary: secondary.slug,
                  })}
                  className="rounded-2xl border border-white/80 bg-white/90 px-4 py-4 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-purple-200 hover:text-purple-700 hover:shadow-lg hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-purple-800 dark:hover:text-purple-300"
                >
                  {secondary.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
