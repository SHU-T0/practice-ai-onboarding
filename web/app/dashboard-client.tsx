"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { useProgressStore } from "@/lib/progress-store";
import { useHasMounted } from "@/lib/use-has-mounted";

interface ChapterData {
  slug: string;
  title: string;
  order: number;
  category: string;
  description: string;
  checklistCount: number;
}

interface GuideData {
  slug: string;
  title: string;
}

interface DashboardClientProps {
  chapters: ChapterData[];
  guides: GuideData[];
}

export function DashboardClient({ chapters, guides }: DashboardClientProps) {
  const mounted = useHasMounted();
  const { getChapterProgress, getOverallProgress } = useProgressStore();
  const overallProgress = mounted ? getOverallProgress(chapters) : 0;

  // Find next incomplete chapter
  const nextChapter = chapters.find((ch) => {
    if (ch.checklistCount === 0) return false;
    const progress = getChapterProgress(ch.slug, ch.checklistCount);
    return progress < 100;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          AI人材育成 研修プログラム
        </h1>
        <p className="mt-2 text-muted-foreground">
          非エンジニアがAIを活用してアプリ開発ができるようになるための研修プログラムです。
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <ProgressBar value={overallProgress} label="全体進捗" />
          {nextChapter && (
            <div className="mt-4">
              <Button asChild>
                <Link
                  href={`/curriculum/${nextChapter.slug}`}
                  className="gap-2"
                >
                  次へ進む: {nextChapter.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chapters Grid */}
      <h2 className="mb-4 text-xl font-semibold">カリキュラム</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((chapter) => {
          const progress = mounted
            ? getChapterProgress(chapter.slug, chapter.checklistCount)
            : 0;
          return (
            <Link key={chapter.slug} href={`/curriculum/${chapter.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {chapter.order}
                    </span>
                    <CardTitle className="text-base">{chapter.title}</CardTitle>
                  </div>
                  {chapter.description && (
                    <CardDescription className="text-xs">
                      {chapter.description}
                    </CardDescription>
                  )}
                </CardHeader>
                {chapter.checklistCount > 0 && (
                  <CardContent>
                    <ProgressBar
                      value={progress}
                      size="sm"
                      showPercentage={true}
                    />
                  </CardContent>
                )}
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Guides */}
      <h2 className="mb-4 mt-8 text-xl font-semibold">
        ガイド・リファレンス
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        研修中にいつでも参照できるガイド集です。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 py-4">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium">{guide.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
