---
title: "Week 0: 環境構築チェックリスト"
order: 1
category: "week"
description: "開発環境のセットアップと必要なツールのインストール"
---

# Week 0: 環境構築チェックリスト

## 概要

**所要時間**: 数日〜1週間
**担当**: 講師
**目的**: 初日の学習時間を環境構築で消費しないため、完璧な環境を事前に用意する

⚠️ **最重要原則**: Day 1の9:00には全員が「AIを体感する」ところからスタートできる状態にする

**実施方式**: 講師が画面共有しながら、メンバーに手元で実行してもらう方式で進める

## Mac端末検証チェックリスト

### 1. ハードウェア要件確認

各受講者のMacについて以下を確認:

- [ ] **macOSバージョン**: 最新版または1つ前のメジャーバージョン
  - 確認方法: `システム設定 > 一般 > 情報`
  - 推奨: macOS Sonoma 14.x 以上

- [ ] **RAM**: 16GB以上
  - 確認方法: `このMacについて > メモリ`
  - 16GB未満の場合は講師に報告

- [ ] **ストレージ空き容量**: 50GB以上
  - 確認方法: `このMacについて > ストレージ`
  - 不足する場合は不要ファイルの削除を依頼

- [ ] **Apple ID**: 有効なApple IDでサインイン済み
  - 確認方法: `システム設定 > Apple ID`
  - 2ファクタ認証が有効であることを確認

- [ ] **管理者権限**: 受講者が管理者権限を持っている
  - 確認方法: `システム設定 > ユーザとグループ`

### 2. 端末リスト作成

| 受講者名 | macOSバージョン | RAM | 空き容量 | Apple ID | 管理者権限 | 備考 |
|---------|----------------|-----|---------|----------|-----------|------|
| [氏名1] |                |     |         | ✓/✗      | ✓/✗       |      |
| [氏名2] |                |     |         | ✓/✗      | ✓/✗       |      |
| [氏名3] |                |     |         | ✓/✗      | ✓/✗       |      |
| [氏名4] |                |     |         | ✓/✗      | ✓/✗       |      |
| [氏名5] |                |     |         | ✓/✗      | ✓/✗       |      |

## インストール手順

### Phase 1: Xcode（所要時間: 1-2時間）

Xcodeのインストールは時間がかかるため、最優先で実行。

#### 1.1 Xcode本体のインストール

```bash
# App Storeから「Xcode」を検索してインストール
# または以下のリンクから
# https://apps.apple.com/jp/app/xcode/id497799835
```

- [ ] App Storeを開く
- [ ] 「Xcode」を検索
- [ ] 「入手」→「インストール」（容量: 約15GB、時間: 30分〜1時間）
- [ ] インストール完了後、一度起動してライセンスに同意

#### 1.2 Xcode Command Line Toolsのインストール

```bash
xcode-select --install
```

- [ ] ターミナルで上記コマンドを実行
- [ ] インストールダイアログで「インストール」をクリック
- [ ] 完了を待つ（10-20分）

#### 1.3 動作確認

```bash
xcode-select -p
# 出力例: /Applications/Xcode.app/Contents/Developer
```

### Phase 2: Homebrew + Node.js環境（所要時間: 30分）

#### 2.1 Homebrewのインストール

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- [ ] ターミナルで上記コマンドを実行
- [ ] パスワードを入力
- [ ] インストール完了後、表示される指示に従いPATHを設定

```bash
# Apple Silicon Macの場合、以下を ~/.zshrc に追加
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

#### 2.2 動作確認

```bash
brew --version
# 出力例: Homebrew 4.x.x
```

#### 2.3 nvmのインストール

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- [ ] インストール完了後、ターミナルを再起動

#### 2.4 動作確認

```bash
nvm --version
# 出力例: 0.39.7
```

#### 2.5 Node.js LTSのインストール

```bash
nvm install --lts
nvm use --lts
nvm alias default node
```

#### 2.6 動作確認

```bash
node --version
# 出力例: v20.x.x

npm --version
# 出力例: 10.x.x
```

### Phase 3: Cursor Pro（所要時間: 15分）

#### 3.1 Cursorのダウンロードとインストール

- [ ] https://cursor.sh からダウンロード
- [ ] dmgファイルを開き、アプリケーションフォルダにドラッグ
- [ ] Cursorを起動

#### 3.2 Cursor Proの登録

- [ ] Cursorを開く
- [ ] アカウント作成（受講者のメールアドレス）
- [ ] Proプランに登録（会社経費で処理）
  - クレジットカード情報を入力
  - 月額 $20 / 約3,000円

#### 3.3 初期設定

- [ ] `Settings > AI` で以下を確認:
  - Model: `claude-opus-4-6` (Claude 4.6 Opus) が選択されていること
  - Composer: 有効
- [ ] 日本語入力のテスト

### Phase 4: GitHub関連（所要時間: 30分）

#### 4.1 GitHubアカウント作成

各受講者に以下を依頼:

- [ ] https://github.com でアカウント作成（受講者のメールアドレス）
- [ ] ユーザー名を講師に共有

#### 4.2 研修リポジトリのクローン

講師が画面共有しながらメンバーに実行してもらう:

```bash
# 講師のリポジトリをクローン
git clone https://github.com/[講師ユーザー名]/practice-ai-onboarding.git
cd practice-ai-onboarding/web
npm install
npm run dev
```

- [ ] 上記コマンドを順番に実行
- [ ] ブラウザで http://localhost:3000 にアクセス
- [ ] 研修アプリが正しく表示されることを確認

#### 4.3 GitHub Desktop（オプション）

※ ターミナルでのgit操作をメインとするため、オプション扱い

- [ ] https://desktop.github.com からダウンロード（任意）
- [ ] インストール（任意）
- [ ] GitHub Desktopを起動してログイン（任意）

#### 4.4 Git初期設定

```bash
git config --global user.name "受講者の名前"
git config --global user.email "受講者のメール"
```

#### 4.5 動作確認

```bash
git config --global --list
```

### Phase 5: EAS CLI（所要時間: 10分）

#### 5.1 EAS CLIのインストール

```bash
npm install -g eas-cli
```

#### 5.2 動作確認

```bash
eas --version
# 出力例: eas-cli/x.x.x
```

#### 5.3 Expoアカウント作成

- [ ] https://expo.dev でアカウント作成
- [ ] ターミナルでログイン:

```bash
eas login
```

#### 5.4 動作確認

```bash
eas whoami
# 出力例: Logged in as [受講者のユーザー名]
```

- [ ] ログイン状態を確認
- [ ] 個人アカウントで完結していることを確認

## アカウント設定チェックリスト

### 1. GitHub

- [ ] 全受講者がGitHubアカウントを作成済み
- [ ] 全受講者が研修リポジトリをクローン済み
- [ ] `npm install && npm run dev` が正常に動作することを確認

### 2. Apple Developer

- [ ] 全受講者が有効なApple IDを持っている
- [ ] 全受講者がMacにApple IDでサインイン済み

### 3. Claude Pro

各受講者に以下を依頼:

- [ ] https://claude.ai でアカウント作成
- [ ] Proプランに登録（会社経費で処理）
  - 月額 $20 / 約3,000円
- [ ] 動作確認: 長文の質問に回答できること

### 4. Supabase

各受講者に以下を依頼:

- [ ] https://supabase.com でアカウント作成
- [ ] 受講者のメールアドレスを使用
- [ ] Freeプランで開始

⚠️ **注意**: Supabaseプロジェクトの作成はDay 3で実施（今はアカウント作成のみ）

### 5. v0

各受講者に以下を依頼:

- [ ] https://v0.dev でアカウント作成
- [ ] Premiumプランに登録（会社経費で処理）
  - 月額 $20 / 約3,000円

### 6. Notion

- [ ] 会社のNotionワークスペースに全受講者を招待
- [ ] 研修用ページへのアクセス権限を付与
- [ ] 受講者が招待を承認済み

### 7. Slack

- [ ] #ai-builders チャンネルを作成
- [ ] 全受講者を招待
- [ ] 講師の自己紹介投稿
- [ ] 受講者に挨拶を促す

## 講師が事前に作成すべき教材リスト

### 1. スターターテンプレート

講師のGitHubリポジトリに作成:

- [ ] Expo + Supabase連携済みのテンプレートプロジェクト
- [ ] `.env.example` ファイル
- [ ] README with setup instructions
- [ ] 動作確認済み（iOS Simulator、実機）
- [ ] リポジトリURL: `https://github.com/[講師ユーザー名]/expo-supabase-starter.git`

#### テンプレートの要件

```
expo-supabase-starter/
├── app/                    # Expo Router
│   ├── (tabs)/
│   │   ├── index.tsx      # ホーム画面
│   │   └── profile.tsx    # プロフィール画面
│   └── _layout.tsx
├── components/            # 共通コンポーネント
├── lib/
│   └── supabase.ts       # Supabase設定
├── .env.example          # 環境変数テンプレート
├── app.json
├── package.json
└── README.md
```

### 2. Supabaseテンプレートプロジェクト

- [ ] テスト用Supabaseプロジェクトを作成
- [ ] サンプルテーブル（`todos`）を作成
- [ ] Row Level Security (RLS) の設定
- [ ] 匿名アクセスの有効化（Day 3用）
- [ ] 認証設定（Day 4用）

#### テーブルスキーマ

```sql
-- todos テーブル
create table todos (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 3. ドキュメント

- [ ] 環境構築手順書（画面キャプチャ付き）
- [ ] トラブルシューティングガイド
  - Xcodeビルドエラー集
  - Supabase接続エラー集
  - EASビルドエラー集
- [ ] よくある質問（FAQ）
- [ ] 用語集（state、API、DB等）

### 4. スライド資料

- [ ] Day 1: AI基礎（PPT/Keynote）
- [ ] Day 2: UI・状態管理（PPT/Keynote）
- [ ] Day 3: バックエンド入門（PPT/Keynote）
- [ ] Day 4: 認証・Git（PPT/Keynote）
- [ ] Day 5: ビルド・配布（PPT/Keynote）

### 5. 課題テンプレート

- [ ] Day 1: ボタン付きアプリの仕様
- [ ] Day 2: ToDoアプリの仕様
- [ ] Day 3: CRUD操作アプリの仕様
- [ ] Day 4: ログイン機能の仕様
- [ ] 個人プロジェクト要件定義テンプレート

## 共通設定ファイル配布・動作確認手順

### 1. スターターテンプレートの配布

講師が画面共有しながら、メンバーに手元で実行してもらう:

```bash
# 受講者が実行
cd ~/Documents
git clone https://github.com/[講師ユーザー名]/expo-supabase-starter.git
cd expo-supabase-starter
npm install
```

- [ ] 講師が画面共有して実行手順を見せる
- [ ] メンバーが各自のターミナルで同じコマンドを実行
- [ ] エラーが出た場合はその場で対処

### 2. 環境変数の設定

```bash
# .env.example を .env にコピー
cp .env.example .env

# Supabase情報を入力（講師が提供）
# SUPABASE_URL=https://xxx.supabase.co
# SUPABASE_ANON_KEY=eyJxxx...
```

### 3. 動作確認（iOS Simulator）

```bash
npx expo start
# 表示されるメニューで「i」を押してiOS Simulatorで起動
```

#### チェックポイント

- [ ] iOS Simulatorが起動する
- [ ] アプリが表示される（エラーがない）
- [ ] ホーム画面が正しく表示される

### 4. 動作確認（実機）

```bash
npx expo start
# QRコードをExpo Goアプリでスキャン
```

#### チェックポイント

- [ ] Expo Goアプリがインストール済み
- [ ] QRコードをスキャンしてアプリが開く
- [ ] 実機で正しく表示される

### 5. Supabase接続テスト

講師が用意したテストコードを実行:

```typescript
// app/(tabs)/index.tsx
import { supabase } from '@/lib/supabase';

// テストデータを取得
const { data, error } = await supabase
  .from('todos')
  .select('*');

console.log('Supabase接続テスト:', data, error);
```

#### チェックポイント

- [ ] コンソールにデータが表示される
- [ ] エラーが出ない

## 最終確認チェックリスト

### Day 1の前日までに完了すべき項目

#### 環境構築

- [ ] 全受講者のMacで以下がインストール済み:
  - [ ] Xcode + Command Line Tools
  - [ ] Homebrew
  - [ ] nvm + Node.js LTS
  - [ ] Cursor Pro
  - [ ] GitHub Desktop
  - [ ] EAS CLI

#### アカウント

- [ ] 全受講者が以下にアクセス可能:
  - [ ] GitHubアカウント
  - [ ] Apple ID（サインイン済み）
  - [ ] Claude Pro
  - [ ] Supabase
  - [ ] v0
  - [ ] Notion workspace
  - [ ] Slack #ai-builders

#### 教材

- [ ] スターターテンプレートが全員の端末で動作確認済み
- [ ] Supabaseテスト接続が全員成功
- [ ] iOS Simulatorでアプリが起動確認済み
- [ ] 実機でアプリが起動確認済み
- [ ] スライド資料準備完了（Day 1-5）
- [ ] トラブルシューティングガイド作成済み

#### 物理的準備

- [ ] 研修会場の確認
- [ ] プロジェクター/ディスプレイの動作確認
- [ ] Wi-Fi接続の確認（全端末）
- [ ] 電源タップの用意（人数分）
- [ ] ホワイトボード/付箋の用意

#### 講師準備

- [ ] Day 1のデモ練習完了
- [ ] 想定Q&Aの準備
- [ ] エラーパターンの把握
- [ ] バックアッププランの準備（ネットワーク障害時等）

## トラブルシューティング

### よくある問題と解決策

#### Xcodeビルドが失敗する

**原因**: Command Line Toolsが正しくインストールされていない

```bash
# 解決策
sudo xcode-select --reset
xcode-select --install
```

#### Homebrewのパスが通らない

**原因**: `.zshrc` にPATHが設定されていない

```bash
# 解決策（Apple Silicon Mac）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

#### npm installが失敗する

**原因**: Node.jsバージョンが古い、または権限の問題

```bash
# 解決策
nvm install --lts
nvm use --lts
```

#### iOS Simulatorが起動しない

**原因**: Xcodeが正しくインストールされていない、またはライセンス未承認

```bash
# 解決策
# 1. Xcodeを一度起動してライセンスに同意
# 2. Command Line Toolsを再インストール
sudo xcode-select --reset
xcode-select --install
```

#### Supabase接続エラー

**原因**: 環境変数が正しく設定されていない

```bash
# 解決策
# 1. .env ファイルの確認
cat .env

# 2. URLとKEYが正しいか確認
# 3. Supabaseダッシュボードで値を再確認
```

## タイムライン

### 開始3週間前
- [ ] Mac端末の要件確認
- [ ] 不足スペックの端末は調達・交換

### 開始2週間前
- [ ] アカウント作成依頼（GitHub、Apple ID等）
- [ ] スターターテンプレートの作成開始

### 開始1週間前
- [ ] 全端末でXcodeインストール開始（時間がかかるため早めに）
- [ ] 教材作成（スライド、ハンドアウト）

### 開始3日前
- [ ] 全端末で環境構築完了
- [ ] 動作確認（スターターテンプレート）
- [ ] トラブルシューティングガイド作成

### 開始前日
- [ ] 最終動作確認（全端末）
- [ ] 会場準備
- [ ] 講師のリハーサル

### Day 1 当日朝（8:00開始想定）
- [ ] 会場設営
- [ ] 機材チェック
- [ ] Wi-Fi接続テスト
- [ ] 講師の最終確認

## 講師へのメッセージ

この準備フェーズは研修全体の成否を決める最も重要な工程です。

**準備に時間をかけることを恐れないでください。**

- 初日に環境構築で1時間消費すると、受講者のモチベーションが大きく低下します
- 「AIを体感する」前にトラブルシューティングに追われると、研修の目的がブレます
- 完璧な環境を用意することで、講師は教育に集中できます

**チェックリストを必ず全て実行してください。**

- 「たぶん大丈夫」は通用しません
- 全受講者の全端末で動作確認を行ってください
- バックアッププランも必ず用意してください

研修の成功をお祈りしています！
