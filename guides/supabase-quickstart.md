---
title: "Supabaseクイックスタート"
category: "reference"
---

# Supabase入門ガイド

## Supabaseとは？

Google Sheetsのような「データを保存する場所」をインターネット上に用意するサービス。
アプリからデータを読み書きできる。

## Step 1: プロジェクト作成

1. https://supabase.com にアクセス
2. GitHubアカウントでログイン
3. 「New Project」をクリック
4. プロジェクト名を入力
5. データベースパスワードを設定（メモしておく！）
6. リージョン: 「Northeast Asia (Tokyo)」を選択
7. 「Create new project」をクリック

## Step 2: テーブルの作成（GUIで）

1. 左メニューの「Table Editor」をクリック
2. 「New Table」をクリック
3. テーブル名を入力（例: todos）
4. カラムを追加:
   - id: int8, Primary Key（自動作成される）
   - created_at: timestamptz（自動作成される）
   - title: text
   - is_completed: bool, Default: false
5. 「Save」をクリック

## Step 3: APIキーの取得

1. 左メニューの「Settings」→「API」
2. 以下の2つをコピー:
   - Project URL: `https://xxxxxx.supabase.co`
   - anon public key: `eyJhbGciOi...`
3. これらを `.env.local` に設定

## Step 4: Expoアプリからの接続

```typescript
// Supabaseクライアントの初期化ファイル
import { createClient } from '@supabase/supabase-js'

// 環境変数からSupabaseの接続情報を取得
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

// Supabaseクライアントを作成してエクスポート
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 5: データの読み書き

```typescript
// データを全件取得（SELECT * FROM todos）
const { data, error } = await supabase.from('todos').select('*')

// データを追加（INSERT INTO todos）
const { error } = await supabase.from('todos').insert({ title: '新しいタスク' })

// データを更新（UPDATE todos WHERE id = 1）
const { error } = await supabase.from('todos').update({ is_completed: true }).eq('id', 1)

// データを削除（DELETE FROM todos WHERE id = 1）
const { error } = await supabase.from('todos').delete().eq('id', 1)
```

## Free planの制限

- 2プロジェクトまで（各自個別アカウントで運用）
- 1週間非アクティブでpause（研修後注意）
- 500MBストレージ
- 必要に応じてPro plan ($25/月)への移行を検討

## よくあるエラーと対処法

| エラー | 原因 | 対処法 |
|--------|------|--------|
| relation "xxx" does not exist | テーブル名の間違い | ダッシュボードでテーブル名を確認 |
| permission denied | RLS有効でポリシー未設定 | RLSを一時的にOFFにする or ポリシーを設定 |
| invalid API key | .env.localの設定ミス | APIキーを再コピー |
