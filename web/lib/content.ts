import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createHeadingIdFactory } from "./heading-utils";

const curriculumDir = path.join(process.cwd(), "..", "curriculum");
const guidesDir = path.join(process.cwd(), "..", "guides");

export interface Chapter {
  slug: string;
  title: string;
  order: number;
  category: string;
  description: string;
  content: string;
  checklistCount: number;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  content: string;
}

function countChecklistItems(content: string): number {
  const matches = content.match(/^- \[[ x]\]/gm);
  return matches ? matches.length : 0;
}

export function extractHeadings(
  content: string
): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const nextHeadingId = createHeadingIdFactory();
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = nextHeadingId(text);
      headings.push({ level, text, id });
    }
  }
  return headings;
}

export function getAllChapters(): Chapter[] {
  if (!fs.existsSync(curriculumDir)) return [];
  const files = fs.readdirSync(curriculumDir).filter((f) => f.endsWith(".md"));
  const chapters = files.map((filename) => {
    const filePath = path.join(curriculumDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(/\.md$/, "");
    return {
      slug,
      title: data.title || slug,
      order: data.order || 99,
      category: data.category || "other",
      description: data.description || "",
      content,
      checklistCount: countChecklistItems(content),
    };
  });
  return chapters.sort((a, b) => a.order - b.order);
}

export function getChapterBySlug(slug: string): Chapter | null {
  const filePath = path.join(curriculumDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    title: data.title || slug,
    order: data.order || 99,
    category: data.category || "other",
    description: data.description || "",
    content,
    checklistCount: countChecklistItems(content),
  };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(guidesDir)) return [];
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".md"));
  return files.map((filename) => {
    const filePath = path.join(guidesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(/\.md$/, "");
    return {
      slug,
      title: data.title || slug,
      category: data.category || "reference",
      content,
    };
  });
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(guidesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    title: data.title || slug,
    category: data.category || "reference",
    content,
  };
}
