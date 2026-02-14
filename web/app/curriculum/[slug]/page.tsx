import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllChapters,
  getChapterBySlug,
  extractHeadings,
} from "@/lib/content";
import { createMdxComponents } from "@/components/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { StepNavigator } from "@/components/step-navigator";
import { ChapterClient } from "./chapter-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllChapters().map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} | AI研修`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex((ch) => ch.slug === slug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const headings = extractHeadings(chapter.content);

  return (
    <ChapterClient
      slug={slug}
      title={chapter.title}
      description={chapter.description}
      headings={headings}
    >
      <article>
        <MDXRemote
          source={chapter.content}
          components={createMdxComponents()}
          options={{ mdxOptions }}
        />
      </article>

      <StepNavigator
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        basePath="/curriculum"
      />
    </ChapterClient>
  );
}
