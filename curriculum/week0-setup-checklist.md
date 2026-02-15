---
title: "Week 0: 環境構築チェックリスト"
order: 1
category: "week"
description: "開発環境のセットアップと必要なツールのインストール"
---

# Week 0: 環境構築チェックリスト

## 概要

**所要時間**: 数日〜1週間
**目的**: 研修初日にスムーズに始められるよう、事前に開発環境を準備します

⚠️ **最重要原則**: Day 1の9:00には全員が「AIを体感する」ところからスタートできる状態にする

## Mac端末検証チェックリスト

### 1. ハードウェア要件確認

各受講者のMacについて以下を確認:

- [ ] **macOSバージョン**: 最新版または1つ前のメジャーバージョン
  - 確認方法: `システム設定 > 一般 > 情報`
  - 推奨: macOS Sonoma 14.x 以上

- [ ] **RAM**: 16GB以上
  - 確認方法: `このMacについて > メモリ`
  - 16GB未満の場合はSlackで報告してください

- [ ] **ストレージ空き容量**: 50GB以上
  - 確認方法: `このMacについて > ストレージ`
  - 不足する場合は不要ファイルの削除を依頼

- [ ] **Apple ID**: 有効なApple IDでサインイン済み
  - 確認方法: `システム設定 > Apple ID`
  - 2ファクタ認証が有効であることを確認

- [ ] **管理者権限**: 受講者が管理者権限を持っている
  - 確認方法: `システム設定 > ユーザとグループ`

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

- [ ] https://github.com でアカウント作成（受講者のメールアドレス）

#### 4.2 研修リポジトリのクローン

以下のコマンドをターミナルで実行してください:

```bash
# 研修リポジトリをクローン
git clone https://github.com/SHU-T0/practice-ai-onboarding.git
cd practice-ai-onboarding/web
npm install
npm run dev
```

- [ ] 上記コマンドを順番に実行
- [ ] ブラウザで http://localhost:3000 にアクセス
- [ ] 研修アプリが正しく表示されることを確認

#### 4.3 Git初期設定

```bash
git config --global user.name "受講者の名前"
git config --global user.email "受講者のメール"
```

#### 4.4 動作確認

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

- [ ] https://claude.ai でアカウント作成
- [ ] Proプランに登録（会社経費で処理）
  - 月額 $20 / 約3,000円
- [ ] 動作確認: 長文の質問に回答できること

### 4. Supabase

- [ ] https://supabase.com でアカウント作成
- [ ] 受講者のメールアドレスを使用
- [ ] Freeプランで開始

⚠️ **注意**: Supabaseプロジェクトの作成はDay 3で実施（今はアカウント作成のみ）

### 5. v0

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
- [ ] Slackで自己紹介を投稿する


## 最終確認チェックリスト

### Day 1の前日までに完了すべき項目

#### 環境構築

- [ ] 全受講者のMacで以下がインストール済み:
  - [ ] Xcode + Command Line Tools
  - [ ] Homebrew
  - [ ] nvm + Node.js LTS
  - [ ] Cursor Pro
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

解決手順:
1. `.env.local` ファイルが存在するか確認（`cp .env.local.example .env.local` を忘れていないか）
2. `EXPO_PUBLIC_SUPABASE_URL` と `EXPO_PUBLIC_SUPABASE_ANON_KEY` が正しいか確認
3. Supabaseダッシュボード（**Settings → API**）で値を再確認
4. `service_role` キーを間違えて使っていないか確認（`anon` キーが正解）
5. `.env.local` を変更したら `npx expo start` を再起動

