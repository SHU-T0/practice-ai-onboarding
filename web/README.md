# AI人材育成 研修チュートリアル Web アプリ

既存のMarkdownカリキュラムとガイドをインタラクティブに進められるNext.jsアプリです。

## 起動方法

```bash
cd web
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 機能

- カリキュラム全10チャプターの順次学習
- インタラクティブチェックリスト（進捗はブラウザに自動保存）
- コードブロックのワンクリックコピー
- 全体・チャプター別の進捗表示
- ガイド・リファレンス11本
- モバイル対応

## 技術スタック

- Next.js 16 (App Router)
- Tailwind CSS + shadcn/ui
- next-mdx-remote (MDXレンダリング)
- Zustand (進捗管理 + LocalStorage永続化)
- remark-gfm (テーブル・チェックリスト対応)
