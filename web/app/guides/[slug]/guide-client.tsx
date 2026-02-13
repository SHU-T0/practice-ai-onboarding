"use client";

import { TableOfContents } from "@/components/table-of-contents";
import { ChapterProvider } from "@/components/chapter-context";
import { CheckboxCounterProvider } from "@/components/checkbox-counter-context";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface GuideClientProps {
  slug: string;
  title: string;
  headings: Heading[];
  children: React.ReactNode;
}

export function GuideClient({
  slug,
  title,
  headings,
  children,
}: GuideClientProps) {
  return (
    <ChapterProvider chapterId={`guide:${slug}`}>
      <CheckboxCounterProvider>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>

        <TableOfContents headings={headings} />

        {children}
      </CheckboxCounterProvider>
    </ChapterProvider>
  );
}
