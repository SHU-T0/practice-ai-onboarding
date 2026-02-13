"use client";

import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import type { Chapter, Guide } from "@/lib/content";

interface AppShellProps {
  chapters: Pick<Chapter, "slug" | "title" | "order" | "checklistCount">[];
  guides: Pick<Guide, "slug" | "title">[];
  children: React.ReactNode;
}

export function AppShell({ chapters, guides, children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar chapters={chapters} guides={guides} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center border-b px-4 md:hidden">
          <MobileSidebar chapters={chapters} guides={guides} />
          <span className="ml-2 text-sm font-semibold">AI研修プログラム</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
