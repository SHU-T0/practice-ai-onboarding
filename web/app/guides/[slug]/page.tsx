import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuides, getGuideBySlug, extractHeadings } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { GuideClient } from "./guide-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | AI研修ガイド`,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const headings = extractHeadings(guide.content);

  return (
    <GuideClient slug={slug} title={guide.title} headings={headings}>
      <article>
        <MDXRemote source={guide.content} components={mdxComponents} options={{ mdxOptions }} />
      </article>
    </GuideClient>
  );
}
