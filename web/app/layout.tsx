import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { getAllChapters, getAllGuides } from "@/lib/content";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI人材育成 研修プログラム",
  description:
    "非エンジニアがAIを活用してアプリを開発できるようになるオンボーディング研修",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chapters = getAllChapters().map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    order: ch.order,
    checklistCount: ch.checklistCount,
  }));
  const guides = getAllGuides().map((g) => ({
    slug: g.slug,
    title: g.title,
  }));

  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AppShell chapters={chapters} guides={guides}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
