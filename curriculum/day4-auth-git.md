---
title: "Day 4: 認証とGit"
order: 5
category: "day"
description: "ユーザー認証の実装とGitによるバージョン管理"
---

# Day 4: 認証（Auth）

## ゴール
- ログイン機能の実装
- メモアプリのCRUD完成

## 新概念
- Supabase Auth（認証）
- Expo Router（ファイルベースルーティング）

---

## タイムテーブル

| 時間 | 内容 | 形式 |
|------|------|------|
| 9:00-9:15 | 朝の復習（Day 3の再構築チャレンジ） | 個人 |
| 9:15-9:45 | プロジェクト構造の移行（App.tsx → Expo Router）+ memosテーブル作成 | 全体→個人 |
| 9:45-10:30 | Supabase Authでメール/パスワードログイン実装（講師ライブデモ→全員一斉に） | 全体→個人 |
| 10:30-10:45 | 休憩 | - |
| 10:45-12:00 | ログイン付きメモアプリを完成（認証+メモのCRUD） | 個人(講師巡回) |
| 12:00-13:00 | 昼休み | - |
| 13:00-14:30 | メモアプリの機能拡充: メモ追加・編集・削除を実装 | 個人(講師巡回) |
| 14:30-14:45 | 休憩 | - |
| 14:45-15:30 | UI改善: デザイン調整、バッファ（遅れている人のキャッチアップ） | 個人 |
| 15:30-16:00 | ミニティーチャー + 成果発表 + 振り返り | 全体 |

---

## 朝の復習（9:00-9:15）

### Day 3 再構築チャレンジ

**目的**: Day 3で学んだSupabase接続の手順を定着させる

**課題**: 昨日作ったApp.tsxベースのプロジェクトで、Supabase接続コードを**何も見ずに**書き直す（10分）

#### 手順

1. 昨日のプロジェクトを開く
2. App.tsxのSupabase接続部分を一度削除
3. 何も見ずに、Supabaseからデータを取得→表示するコードを書き直す
4. 詰まったらAIに質問してOK

#### 完了チェックポイント

- [ ] Supabaseからデータを取得できた
- [ ] 画面にデータが表示された

**時間内に完成しなくても大丈夫**: この課題は「思い出す訓練」が目的です。詰まった箇所を確認して午前の学習に活かしましょう。

---

## プロジェクト構造の移行（Day 3 → Day 4）

### なぜ構造が変わるのか

Day 2-3では `App.tsx` 1ファイルでアプリを作ってきました。
今日からは**ログイン画面**と**メイン画面**の2つの画面が必要です。

複数画面を管理するために、**Expo Router**という仕組みに移行します。

```
Day 2-3の構造（App.tsxベース）:
  my-app/
  ├── App.tsx              ← 全部ここに書いていた
  └── lib/supabase.ts

Day 4以降の構造（Expo Routerベース）:
  my-app/
  ├── app/                 ← この中にファイルを置くと画面になる
  │   ├── _layout.tsx      ← 全画面共通の枠組み（認証チェック等）
  │   ├── index.tsx        ← メイン画面（/）
  │   └── login.tsx        ← ログイン画面（/login）
  └── lib/supabase.ts      ← これは同じ
```

**Expo Routerのルール**: `app/` フォルダ内のファイル名がそのまま画面のアドレスになります。
- `app/index.tsx` → `/`（トップ画面）
- `app/login.tsx` → `/login`（ログイン画面）

### 新規プロジェクトの作成

**Day 3までのプロジェクトは残したまま**、新しいプロジェクトを作ります。

```bash
cd ~/Documents
npx create-expo-app@latest memo-app
cd memo-app
```

> **注意**: Day 2-3では `--template blank-typescript` を使いましたが、今回はテンプレート指定なしで作成します。デフォルトで Expo Router が含まれています。

```bash
npm install @supabase/supabase-js
npx expo install @react-native-async-storage/async-storage
```

### Rulesの確認

Day 1でCursor Settingsに設定したRulesは、全プロジェクトに自動適用されます。新しいプロジェクトでも追加設定は不要です。

> Rulesが設定されているか不安な場合: `Cmd + ,` → 「Rules」→ 「User Rules」にテキストが入っていればOK

### 完了チェックポイント

- [ ] 新規プロジェクト `memo-app` を作成した
- [ ] `app/` フォルダが存在することを確認した
- [ ] 必要なパッケージをインストールした
- [ ] `npx expo start` でアプリが起動する

---

## 午前: Supabase Auth実装

### memosテーブルの作成

Day 3では `todos` テーブルを使いましたが、今日は**メモアプリ**を作るので、新しい `memos` テーブルを作成します。

#### Supabaseダッシュボードで作成

1. 左メニューから「Table Editor」をクリック
2. 「Create a new table」をクリック

**テーブル設定**:

- **Name**: `memos`
- **Description**: `User memos`
- 「Enable Row Level Security (RLS)」のチェックを**外す**（明日有効化します）

**Columns（列）**:

デフォルトの `id` と `created_at` に加えて、以下を追加:

| Name | Type | Default Value | Nullable |
|------|------|---------------|----------|
| user_id | uuid | - | ✗ |
| title | text | - | ✗ |
| content | text | - | ✓ |

3. 「Save」をクリック

> **Day 3との違い**: `user_id` カラムが追加されています。これは「誰のメモか」を記録するためです。明日のRLS設定で使います。

#### 完了チェックポイント

- [ ] `memos` テーブルが作成された
- [ ] `user_id`, `title`, `content` カラムが存在する

---

### Supabase Auth セットアップ手順

#### 1. Supabase プロジェクト設定

1. Supabase ダッシュボードで **Authentication** → **Providers** を開く
2. **Email** を有効化（デフォルトでON）
3. **Confirm email** を無効化（開発中はメール確認なしで進める）

#### 2. .env.local ファイル作成

プロジェクトルートに `.env.local` ファイルを作成:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**重要**: `.env.local` は `.gitignore` に含まれるため、Gitで管理されない

#### 3. Supabase クライアント作成

> パッケージのインストールは「プロジェクト構造の移行」セクションで完了しています。

Composerで以下を指示:

```
lib/supabase.ts ファイルを作成してください。

要件:
- @supabase/supabase-jsとAsyncStorageを使う
- .env.localからURLとAnon Keyを読み込む（EXPO_PUBLIC_プレフィックス）
- 認証セッションをAsyncStorageに保存する設定にする
- exportしてアプリ全体で使えるようにする
```

> **講師用参考コード**: AIが生成するコードが以下と大きく異なる場合は確認してください:
> ```typescript
> import AsyncStorage from '@react-native-async-storage/async-storage';
> import { createClient } from '@supabase/supabase-js';
> const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
> const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
> export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
>   auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
> });
> ```

#### 4. ログイン画面の実装

Composerで以下を指示:

```
app/login.tsx を作成してください。

要件:
- メールアドレスとパスワードの入力欄
- 「ログイン」ボタンと「新規登録」ボタン
- Supabase Authでメール/パスワード認証
- エラーメッセージの表示
- ログイン成功後にホーム画面（/）へ遷移
- lib/supabase.tsからsupabaseをimport
- Expo Routerのrouter.replace()で画面遷移
```

#### 5. 認証状態の管理

Composerで以下を指示:

```
app/_layout.tsx を編集してください。

要件:
- アプリ起動時にSupabaseのセッション状態を確認
- ログインしていない場合は /login 画面にリダイレクト
- ログイン済みの場合はホーム画面を表示
- ログイン・ログアウト時に自動で画面を切り替え
- expo-routerのStackナビゲーションを使用
```

#### 6. ログアウト機能

ホーム画面（`app/index.tsx`）にログアウトボタンを追加。Composerで:

```
app/index.tsx にログアウトボタンを追加してください。
ボタンを押すとsupabase.auth.signOut()を実行してください。
```

#### 動作確認

1. `npx expo start` でアプリを起動
2. 「新規登録」でアカウントを作成
3. 作成したアカウントでログイン
4. ホーム画面が表示されることを確認
5. ログアウトボタンでログイン画面に戻ることを確認

---

## 午後: メモアプリの機能拡充（13:00-14:30）

### 講師向けメモ

- 午前中に認証+基本表示が完成しているはず
- 午後はCRUD操作の追加にフォーカス
- **AI→ペア→講師の3段階ルールを徹底**

### メモの追加機能

Composerで以下を指示:

```
app/index.tsx にメモ追加機能を実装してください。

要件:
1. 画面上部にタイトル入力欄と「追加」ボタン
2. ボタンを押すとSupabaseのmemosテーブルにデータを保存
3. 保存後、自動でリストを再取得して更新
4. 入力欄をクリア
5. ローディング中はボタンを無効化
```

### メモの削除機能

Composerで以下を指示:

```
各メモの右側に「削除」ボタンを追加してください。

要件:
1. ボタンを押すとSupabaseからそのメモを削除
2. 削除後、自動でリストを再取得して更新
3. 削除前に確認アラートを表示
```

### 動作確認

1. メモを3件追加してみる
2. Supabaseダッシュボードでデータが保存されていることを確認
3. メモを削除してみる
4. 別のアカウントでログインし、先ほどのメモが見えないことを確認（明日RLSを設定した後に再確認）

### 完了チェックポイント

- [ ] メモを追加できる
- [ ] メモを削除できる
- [ ] Supabaseダッシュボードでデータを確認した

---

## UI改善タイム（14:45-15:30）

ここまで完成している人は、Composerでアプリの見た目を改善しましょう。

**プロンプト例**:

```
メモアプリのデザインを改善してください。

要件:
- メモカードにシャドウと角丸をつける
- 追加ボタンを目立つ色にする
- ヘッダーにアプリ名を表示
- 全体的にすっきりしたデザインに
```

**遅れている人**: 講師と一緒にキャッチアップしましょう。

---

## トラブルシューティング

### ログインできない

- メールアドレスとパスワードが正しいか確認
- Supabase ダッシュボードの **Authentication** → **Users** でユーザーが作成されているか確認
- エラーメッセージを確認

### メモが追加・削除できない

- Supabaseダッシュボードで `memos` テーブルが存在するか確認
- `user_id` カラムが存在するか確認
- コンソールのエラーメッセージを確認

---

## 成果発表 + 振り返り（15:30-16:00）

### ミニティーチャー（5分）

**今日の担当**: [受講者名C]

**テーマ**: Day 3で学んだ「Supabaseのデータ読み書き」を自分の言葉で他の受講者に説明する

#### 説明に含めるポイント

- Supabaseとは何か
- データの取得方法（`select()`）
- データの追加方法（`insert()`）
- 実際に作ったアプリでのデモ

> **ミニティーチャー制度**: 毎日1名が前日の学びを5分で説明する。教えることが最大の学び。全員が研修中に最低2回担当する。

### 成果発表（15分）

各自が作成したログイン付きメモアプリをデモ:
- ログイン・ログアウト動作
- メモの追加・削除操作
- UI改善のポイント

### 振り返り（10分）

- 今日難しかったこと
- 明日への課題
- 学びのメモ

---

## まとめ

今日学んだこと:

1. **Expo Router**: ファイルベースの画面管理
2. **Supabase Auth**: メール/パスワード認証
3. **メモのCRUD**: 追加・表示・削除

明日: Gitでコードを管理 + セキュリティ + TestFlightでアプリを配布
