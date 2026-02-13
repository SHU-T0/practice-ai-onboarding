---
title: "Expo Router構成図"
category: "reference"
---

# Expo Routerファイル構造図

## Expo Routerとは？

ファイルを作ると、そのままページ（画面）になる仕組み。
フォルダ構造 = アプリの画面構造。

## 基本構造

```
app/
├── _layout.tsx       ← アプリ全体の設定（ナビゲーション）
├── index.tsx         ← ホーム画面（/）
├── about.tsx         ← アバウト画面（/about）
├── (tabs)/           ← タブナビゲーション
│   ├── _layout.tsx   ← タブの設定
│   ├── home.tsx      ← ホームタブ
│   └── settings.tsx  ← 設定タブ
└── detail/
    └── [id].tsx      ← 詳細画面（/detail/1, /detail/2...）
```

## ルール

1. `app/` フォルダの中にファイルを作る = ページが増える
2. `_layout.tsx` = そのフォルダのページの「枠組み」を決める
3. `index.tsx` = そのフォルダのデフォルトページ
4. `[id].tsx` = 動的なページ（IDが変わる）
5. `(tabs)/` = カッコ付きフォルダはグループ化（URLには影響しない）

## よく使うナビゲーション

```typescript
import { router } from 'expo-router'

// 別の画面に移動する
router.push('/about')

// 詳細画面にIDを渡して移動する
router.push('/detail/123')

// 前の画面に戻る
router.back()
```

## 画面遷移の図解（テキストベース）

```
[ホーム画面] --タップ--> [一覧画面] --アイテムタップ--> [詳細画面]
     ↕ タブ切り替え          ↑ 戻る                       ↑ 戻る
[設定画面]
```

## 初心者向けアドバイス

- まずは `app/index.tsx` だけで作り始める
- ページを増やしたくなったら、`app/` に新しいファイルを追加
- ファイル名 = URL（ページのアドレス）
- 困ったら「Expo Routerで〇〇したい」とCursorに聞く
