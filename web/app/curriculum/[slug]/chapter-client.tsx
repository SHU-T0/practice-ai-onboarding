"use client";

import { TableOfContents } from "@/components/table-of-contents";
import { ChapterProvider } from "@/components/chapter-context";
import { CheckboxCounterProvider } from "@/components/checkbox-counter-context";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface ChapterClientProps {
  slug: string;
  title: string;
  description: string;
  headings: Heading[];
  children: React.ReactNode;
}

export function ChapterClient({
  slug,
  title,
  description,
  headings,
  children,
}: ChapterClientProps) {
  return (
    <ChapterProvider chapterId={slug}>
      <CheckboxCounterProvider>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        <TableOfContents headings={headings} />

        {children}
      </CheckboxCounterProvider>
    </ChapterProvider>
  );
}
