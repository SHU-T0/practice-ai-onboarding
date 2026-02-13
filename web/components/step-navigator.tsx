import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavigatorProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  basePath: string;
}

export function StepNavigator({ prev, next, basePath }: StepNavigatorProps) {
  return (
    <nav className="mt-12 flex items-center justify-between border-t pt-6">
      {prev ? (
        <Button variant="ghost" asChild>
          <Link href={`${basePath}/${prev.slug}`} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="max-w-[200px] truncate">{prev.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button variant="ghost" asChild>
          <Link href={`${basePath}/${next.slug}`} className="gap-2">
            <span className="max-w-[200px] truncate">{next.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </nav>
  );
}
