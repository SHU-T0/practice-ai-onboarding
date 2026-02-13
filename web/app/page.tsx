import { getAllChapters, getAllGuides } from "@/lib/content";
import { DashboardClient } from "./dashboard-client";

export default function DashboardPage() {
  const chapters = getAllChapters().map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    order: ch.order,
    category: ch.category,
    description: ch.description,
    checklistCount: ch.checklistCount,
  }));

  const guides = getAllGuides().map((g) => ({
    slug: g.slug,
    title: g.title,
  }));

  return <DashboardClient chapters={chapters} guides={guides} />;
}
