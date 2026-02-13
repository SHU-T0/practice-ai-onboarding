"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import type { Chapter, Guide } from "@/lib/content";

interface MobileSidebarProps {
  chapters: Pick<Chapter, "slug" | "title" | "order" | "checklistCount">[];
  guides: Pick<Guide, "slug" | "title">[];
}

export function MobileSidebar({ chapters, guides }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">メニュー</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">ナビゲーション</SheetTitle>
        <div onClick={() => setOpen(false)}>
          <Sidebar chapters={chapters} guides={guides} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
