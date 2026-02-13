"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FileText,
  Home,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressBar } from "@/components/progress-bar";
import { useProgressStore } from "@/lib/progress-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { Chapter, Guide } from "@/lib/content";

interface SidebarProps {
  chapters: Pick<Chapter, "slug" | "title" | "order" | "checklistCount">[];
  guides: Pick<Guide, "slug" | "title">[];
}

export function Sidebar({ chapters, guides }: SidebarProps) {
  const pathname = usePathname();
  const [guidesOpen, setGuidesOpen] = useState(false);
  const mounted = useHasMounted();
  const { getChapterProgress, getOverallProgress } = useProgressStore();

  const overallProgress = mounted ? getOverallProgress(chapters) : 0;

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="border-b p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-sm">AI研修プログラム</span>
        </Link>
        <div className="mt-3">
          <ProgressBar value={overallProgress} label="全体進捗" size="sm" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        {/* Home */}
        <Link
          href="/"
          className={`mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname === "/" ? "bg-accent font-medium" : "text-muted-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          ダッシュボード
        </Link>

        {/* Curriculum */}
        <div className="mt-4">
          <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            カリキュラム
          </h3>
          <nav className="space-y-0.5">
            {chapters.map((chapter) => {
              const progress = mounted
                ? getChapterProgress(chapter.slug, chapter.checklistCount)
                : 0;
              const isActive = pathname === `/curriculum/${chapter.slug}`;
              const isComplete = progress === 100 && chapter.checklistCount > 0;

              return (
                <Link
                  key={chapter.slug}
                  href={`/curriculum/${chapter.slug}`}
                  className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                    isActive
                      ? "bg-accent font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">
                      {chapter.order}
                    </span>
                  )}
                  <span className="flex-1 truncate">{chapter.title}</span>
                  {chapter.checklistCount > 0 && !isComplete && (
                    <span className="text-[10px] text-muted-foreground">
                      {progress}%
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Guides */}
        <div className="mt-4">
          <button
            onClick={() => setGuidesOpen(!guidesOpen)}
            className="flex w-full items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            {guidesOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
            ガイド
          </button>
          {guidesOpen && (
            <nav className="mt-1 space-y-0.5">
              {guides.map((guide) => {
                const isActive = pathname === `/guides/${guide.slug}`;
                return (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive
                        ? "bg-accent font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{guide.title}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
