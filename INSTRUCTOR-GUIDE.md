# 講師向け実施手順書

この手順書は、研修を実際に進める講師（あなた）のためのガイドです。
「何を」「いつまでに」「どの順番で」準備・実施すればよいかをまとめています。

---

## 目次

1. [このリポジトリの使い方](#1-このリポジトリの使い方)
2. [全体スケジュール（逆算）](#2-全体スケジュール逆算)
3. [Phase 1: 研修3週間前〜 アカウント・契約](#3-phase-1-研修3週間前-アカウント契約)
4. [Phase 2: 研修2週間前〜 環境構築](#4-phase-2-研修2週間前-環境構築)
5. [Phase 3: 研修1週間前〜 教材準備](#5-phase-3-研修1週間前-教材準備)
6. [Phase 4: 前日 最終確認](#6-phase-4-前日-最終確認)
7. [Week 1 実施ガイド（Day 1-5）](#7-week-1-実施ガイドday-1-5)
8. [Week 2 実施ガイド（Day 6-7 + 個人開発）](#8-week-2-実施ガイドday-6-7--個人開発)
9. [Week 3 実施ガイド（仕上げ・発表）](#9-week-3-実施ガイド仕上げ発表)
10. [研修後フォローアップ](#10-研修後フォローアップ)

---

## 1. このリポジトリの使い方

### ファイル構成と用途

```
practice-ai-onboarding/
├── INSTRUCTOR-GUIDE.md          ★ このファイル（講師がまず読む）
├── README.md                     研修全体像（関係者への説明用）
│
├── curriculum/                  ★ 研修の本体（Day別カリキュラム）
│   ├── week0-setup-checklist.md   → Phase 2で使用
│   ├── day1-ai-basics.md          → Day 1当日に使用
│   ├── day2-ui-state.md           → Day 2当日に使用
│   ├── day3-supabase-db.md        → Day 3当日に使用
│   ├── day4-auth-git.md           → Day 4当日に使用
│   ├── day5-testflight.md         → Day 5当日に使用
│   ├── day6-requirements.md       → Day 6当日に使用
│   ├── day7-project-start.md      → Day 7当日に使用
│   ├── week2-individual-dev.md    → Week 2で使用
│   └── week3-polish-launch.md     → Week 3で使用
│
├── templates/                   ★ 配布物・テンプレート
│   ├── .cursorrules               → Cursor Rules原本（Slackに投稿する用）
│   ├── requirements-template.md   → Day 6で受講者に配布
│   ├── persona-canvas.md          → Day 6で受講者に配布
│   ├── feedback-form.md           → Week 3で使用
│   ├── buffer-tasks.md            → 講師待ち時間に配布
│   └── expo-starter/              → Day 7で受講者がコピーして使う
│
├── guides/                      ★ リファレンス（必要に応じて受講者に共有）
│   ├── ai-tools-comparison.md     → Day 1で参考配布
│   ├── cursor-cheatsheet.md       → Day 1で配布、毎日参照
│   ├── cursor-ai-settings.md      → 講師用参考資料
│   ├── git-basics.md              → Day 5で配布
│   ├── testflight-guide.md        → Day 5で参照
│   ├── supabase-quickstart.md     → Day 3で参照
│   ├── prompt-cookbook.md          → 適宜配布
│   ├── debug-basics.md            → Day 3以降で参照
│   ├── security-basics.md         → Day 5で参照
│   ├── expo-router-diagram.md     → Day 4で配布
│   └── next-app-checklist.md      → 研修最終日に配布
│
├── assessment/                    評価・チェック
│   ├── skill-check-rubric.md      → Week 1終了時の実技評価
│   └── self-assessment.md         → 各Dayの終了時に記入
│
└── followup/                      研修後のフォロー
    ├── weekly-mokumoku-plan.md     → 研修後に実施
    └── knowledge-sharing-setup.md → 研修後にNotionセットアップ
```

### カリキュラムファイルの読み方

各Dayのカリキュラムファイルには以下が含まれています:

- **タイムテーブル**: その日の全体スケジュール
- **講師向けメモ**: 各セクションの教え方のコツ（受講者には見せない）
- **受講者配布用手順**: 受講者に見せる手順（画面共有 or 印刷）
- **完了チェックポイント**: 各セクション終了時の確認項目
- **トラブルシューティング**: よくあるエラーと対処法

**使い方**: 前日にカリキュラムを通読し、当日は画面共有しながら「受講者配布用手順」を一緒に進めます。

---

## 2. 全体スケジュール（逆算）

研修開始日を「Day 1」として逆算:

| タイミング | やること | 参照ファイル |
|-----------|---------|-------------|
| **3週間前** | アカウント契約・作成開始 | このガイド Phase 1 |
| **2週間前** | 全Mac端末にXcodeインストール開始 | `week0-setup-checklist.md` |
| **1.5週間前** | 残りの環境構築（Homebrew, Node.js等） | `week0-setup-checklist.md` |
| **1週間前** | 教材準備（スライド、デモ練習） | このガイド Phase 3 |
| **3日前** | 全端末動作確認 | `week0-setup-checklist.md` |
| **前日** | 最終リハーサル・会場準備 | このガイド Phase 4 |
| **Day 1-5** | Week 1: 基礎習得 | `day1〜day5.md` |
| **Day 6-7** | 要件定義 + 個人PJ開始 | `day6, day7.md` |
| **Week 2** | 個人プロジェクト開発 | `week2-individual-dev.md` |
| **Week 3** | 仕上げ・TestFlight・発表 | `week3-polish-launch.md` |

---

## 3. Phase 1: 研修3週間前〜 アカウント・契約

### 3.1 会社で契約・手配するもの

| 項目 | 月額 | アクション |
|------|------|-----------|
| Cursor Pro × 5名 | ~3,000円/人 | 各自のメールでアカウント作成→Pro登録 |
| Claude Pro × 5名 | ~3,000円/人 | 各自のメールでアカウント作成→Pro登録 |
| v0 Premium × 5名 | ~3,000円/人 | 各自のメールでアカウント作成→Premium登録 |
| EAS Production | ~$99/月 | 会社アカウントで契約（ビルド数制限回避） |
| Apple Developer | 会社契約済 | 受講者をチームメンバーに追加 |

### 3.2 受講者に依頼するアカウント作成

以下をSlackまたはメールで依頼（手順書を添えて）:

1. **GitHubアカウント作成** → https://github.com → ユーザー名を講師に共有
2. **Supabaseアカウント作成** → https://supabase.com → 各自個別アカウント
3. **Expoアカウント作成** → https://expo.dev
4. **Claude Proアカウント作成** → https://claude.ai → Pro登録
5. **Apple IDの確認** → 2ファクタ認証が有効であること

### 3.3 講師がやること

- [ ] GitHub Organization に全受講者を招待
- [ ] Apple Developer Program に全受講者を追加
- [ ] Slack `#ai-builders` チャンネルを作成、全員を招待
- [ ] Notion ワークスペースに全員を招待
- [ ] 研修用Supabaseプロジェクトを1つ作成（講師テスト用）

---

## 4. Phase 2: 研修2週間前〜 環境構築

**詳細手順**: `curriculum/week0-setup-checklist.md` に従って実施

### 優先順位（時間がかかるものから）

1. **Xcodeインストール**（30GB超、DL 1-2時間）
   - App Store → 「Xcode」検索 → インストール
   - 全端末で並行して開始する
   - 完了後、一度起動してライセンスに同意させる

2. **Xcode Command Line Tools**
   - ターミナルで `xcode-select --install`

3. **Homebrew → nvm → Node.js LTS**
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   # PATH設定後:
   nvm install --lts
   ```

4. **Cursor Pro インストール**
   - https://cursor.sh → ダウンロード → アプリケーションフォルダへ
   - 各自アカウント作成 → Pro登録

5. **GitHub Desktop インストール**
   - https://desktop.github.com → ダウンロード → GitHubアカウントでログイン

6. **EAS CLI インストール**
   ```
   npm install -g eas-cli
   eas login
   ```

### 環境構築の進め方

**推奨**: 受講者全員を集めて、画面共有しながら一斉に実施（リモートでも可）。
一人ずつ個別対応すると時間が5倍かかります。

**注意**: Apple Silicon Mac と Intel Mac で Homebrew のパスが異なります。
- Apple Silicon: `/opt/homebrew/bin/brew`
- Intel: `/usr/local/bin/brew`

### 動作確認テスト

全端末で以下を確認:

```bash
# 1. テスト用プロジェクト作成
cd ~/Documents
npx create-expo-app@latest test-app --template blank-typescript
cd test-app
npx expo start
# → 「i」を押してiOS Simulatorが起動すればOK

# 2. 確認後、テストプロジェクトは削除してOK
cd ~/Documents
rm -rf test-app
```

---

## 5. Phase 3: 研修1週間前〜 教材準備

### 5.1 講師が作成すべきもの（リポジトリに含まれないもの）

| 教材 | 用途 | 形式 |
|------|------|------|
| **Rulesテキスト** | Day 1で全員がCursor Settingsに貼る | `templates/.cursorrules` の内容をSlackに投稿 |
| **スライド資料（任意）** | 各Dayのミニ座学用 | Keynote/PPT（5枚以内/回） |
| **議事録サンプル** | Day 1のAI実践課題用 | 適当な長文テキスト |
| **デモ練習** | Day 1-5の各デモ | 手順をリハーサル |
| **Apple Team ID** | Day 5のEAS Build設定で全員に配布 | テキスト |
| **Bundle IDルール表** | Day 5: `com.会社名.受講者名.アプリ名` | テキスト |

### 5.2 スライドのポイント

各Dayのミニ座学はカリキュラムファイルに**説明内容が全て記載されている**ため、スライドは必須ではありません。

選択肢:
- **A) カリキュラムを画面共有しながら進める**（スライド不要、最も手軽）
- **B) 要点をスライドにまとめる**（見栄えは良いが作成時間がかかる）
- **C) ホワイトボードに手書き**（少人数対面なら効果的）

### 5.3 テンプレート確認

`templates/expo-starter/` の動作確認:

```bash
cd templates/expo-starter
# package.jsonの依存関係が正しいか確認
# app.jsonのbundleIdentifierを自分の値に変更してテスト
# .env.local.exampleをコピーして.env.localを作成、Supabaseの値を入力してテスト
```

---

## 6. Phase 4: 前日 最終確認

### チェックリスト

#### 環境
- [ ] 全受講者のMacでiOS Simulatorが起動する
- [ ] 全受講者のCursorが起動し、Proライセンスが有効
- [ ] 全受講者のGitHub Desktopがログイン済み
- [ ] Wi-Fiに全端末が接続できる

#### 会場
- [ ] プロジェクター/外部ディスプレイの動作確認
- [ ] 電源タップ（人数分）
- [ ] ホワイトボード/付箋
- [ ] 講師のMacからの画面共有テスト

#### 教材
- [ ] Slackに`templates/.cursorrules`の内容を下書き保存（Day 1で投稿）
- [ ] Day 1のデモ手順を通しでリハーサル済み
- [ ] 議事録サンプルテキストを準備
- [ ] `guides/cursor-cheatsheet.md` を印刷 or 共有リンクを用意

#### 心構え
- [ ] Day 1の最重要ゴールを確認: **全員がシミュレータでアプリを動かす**
- [ ] 「AIに日本語で指示するだけでアプリが作れる」という成功体験がDay 1の全て

---

## 7. Week 1 実施ガイド（Day 1-5）

### 毎日のルーティン

| 時間 | 講師のアクション |
|------|----------------|
| **8:30** | 会場着。プロジェクター・Wi-Fi確認 |
| **8:45** | 当日のカリキュラムファイルを開いて最終確認 |
| **9:00** | 研修開始 |
| **各セクション開始時** | タイマーセット。「完了チェックポイント」を意識 |
| **各セッション中** | 巡回。詰まっている人を早期発見 |
| **16:00** | 研修終了 |
| **16:00-16:30** | 振り返りメモを書く。翌日の準備確認 |

### Day 1: AIを体感する日

**参照**: `curriculum/day1-ai-basics.md`

**前日準備**:
- [ ] Slackに Rules テキスト（`templates/.cursorrules` の内容）を下書き
- [ ] デモスクリプト（Day 1ファイル内の「講師が見せるデモスクリプト」）をリハーサル
- [ ] 議事録サンプルテキストを用意

**当日の流れ**:

| 時間 | やること | コツ |
|------|---------|------|
| 9:00-9:30 | オリエンテーション | 「コードを覚える必要はない」を冒頭で宣言 |
| 9:30-10:00 | ChatGPT/Claude実践 | 全員がブラウザでAIを触る。動いたらOK |
| 10:00-10:15 | プロンプト3原則 | スライド or 画面共有。15分厳守 |
| 10:15-11:00 | プロンプト実践 | ペアで。良いプロンプトを見つけたら全体共有 |
| 11:15-12:00 | AIモデル比較 | 3つのAIに同じ質問→比較シートを埋める |
| 13:00-13:15 | Cursor紹介 | デモ3分→「これから皆さんもやります」 |
| 13:15-14:00 | Cursorデモ | **ここでRules設定**（Slackからコピペ）→ Tab/Cmd+K/Chat/Composer |
| 14:15-15:00 | Hello Worldアプリ | **ターミナル説明から**。全員一斉に `npx create-expo-app` |
| 15:00-15:45 | チャレンジ課題 | 自律的に作業。「AI→ペア→講師」の順番を守らせる |
| 15:45-16:30 | 成果発表+振り返り | 全員の画面を映す。Slackに投稿 |

**Day 1の鉄則**:
- 全員がシミュレータでアプリを動かすことが最優先
- コードの意味を理解させる必要はない
- エラーが出たら「AIに聞いて」と指示

---

### Day 2: UIと状態管理

**参照**: `curriculum/day2-ui-state.md`

**前日準備**:
- [ ] Day 1の振り返りメモを確認（詰まった人がいないか）
- [ ] カウンターアプリのデモをリハーサル

**当日の流れ**:

| 時間 | やること | コツ |
|------|---------|------|
| 9:00-9:15 | 朝の復習 | 昨日のアプリをゼロから再構築（10分） |
| 9:15-9:45 | state概念の説明 | 「顧客リスト」に例える。座学15分厳守 |
| 9:45-10:45 | カウンターアプリ | **焦らず理解定着まで**。全員一斉に |
| 11:00-12:00 | カウンター発展 | リセットボタン、色変更等。個人ペース |
| 13:00-13:15 | エラーの読み方 | 「赤文字の最後の行→AIに貼る」 |
| 13:15-14:30 | ToDoアプリ | 追加・削除・完了トグル。Composerで指示 |
| 14:45-15:30 | カスタマイズ | 色、レイアウト、アイコン等。自由に |
| 15:30-16:00 | 成果発表 | |

**注意**: Day 2は `--template blank-typescript` でプロジェクト作成。App.tsxベース。

---

### Day 3: バックエンド入門（Supabase）

**参照**: `curriculum/day3-supabase-db.md`

**前日準備**:
- [ ] 講師のSupabaseテストプロジェクトで `todos` テーブルが動くことを確認
- [ ] Supabaseダッシュボードの画面構成を把握（Table Editor、Settings等の位置）

**当日の流れ**:

| 時間 | やること | コツ |
|------|---------|------|
| 9:00-9:15 | 朝の復習 | |
| 9:15-9:45 | DBの概念説明 | 「Google Sheets」に例える |
| 9:45-10:45 | Supabase PJ作成+テーブル作成 | **全員一斉に**。GUIで操作 |
| 11:00-12:00 | データ読み出し（SELECT） | App.tsxにComposerで指示 |
| 13:00-14:00 | データ追加・削除 | INSERT, DELETE |
| 14:15-15:00 | 「壊してみて」課題 | 意図的にエラー→AIで解決 |
| 15:00-15:30 | デバッグ実践 | console.logの使い方 |
| 15:30-16:00 | 成果発表 | |

**重要**: Day 3では新しいプロジェクトを作成（App.tsxベース、RLS無効）。
Day 4で Expo Router ベースの新プロジェクトに移行することを**予告**する。

---

### Day 4: 認証（Auth）

**参照**: `curriculum/day4-auth-git.md`

**前日準備**:
- [ ] 講師のSupabaseプロジェクトで Auth → Providers → Email → Confirm email を無効化済みか確認
- [ ] `memos` テーブルの作成手順をリハーサル
- [ ] ログイン画面のデモ（Composerプロンプト→実装→動作確認）をリハーサル

**当日の流れ**:

| 時間 | やること | コツ |
|------|---------|------|
| 9:00-9:15 | 朝の復習 | Day 3のSupabase接続を何も見ずに再現 |
| 9:15-9:45 | プロジェクト構造の移行 | **Expo Router の説明**。新PJ `memo-app` を作成 |
| 9:45-10:30 | Supabase Auth実装 | 講師デモ→全員一斉。Composerで指示 |
| 10:45-12:00 | ログイン付きメモアプリ完成 | Auth + メモ表示。個人作業 |
| 13:00-14:30 | メモ追加・削除 | CRUD完成。Composerで指示 |
| 14:45-15:30 | UI改善タイム | 遅れている人はキャッチアップ |
| 15:30-16:00 | 成果発表 | |

**重要**:
- Day 4は**新規プロジェクト** `memo-app` を作成（テンプレート指定なし = Expo Router入り）
- `memos` テーブルは**Supabaseダッシュボード GUIで作成**（SQLは使わない）
- コードは**全てComposerプロンプト**で生成させる（受講者にコードを書かせない）

---

### Day 5: Git + セキュリティ + TestFlight

**参照**: `curriculum/day5-testflight.md`

**前日準備**:
- [ ] Apple Team ID を確認し、テキストで配布できるようにする
- [ ] Bundle ID ルール表を用意: `com.会社名.受講者名.アプリ名`
- [ ] App Store Connect にアクセスできることを確認
- [ ] EAS Build のデモ（自分のプロジェクトで）を1回通しでやっておく
- [ ] `eas build --platform ios --profile production` の所要時間を把握

**当日の流れ**:

| 時間 | やること | コツ |
|------|---------|------|
| 9:00-9:15 | Day 4成果確認 | メモアプリの動作チェック |
| 9:15-9:30 | Git概念説明 | 「提案書のバージョン管理と同じ」 |
| 9:30-10:15 | GitHub Desktop操作 | Add Local Repo → Commit → Push → GitHub確認 |
| 10:30-11:00 | セキュリティ基礎 | APIキー、.env.local、.gitignore |
| 11:00-11:30 | RLS設定 | SQL Editor にコピペ。意味は理解不要 |
| 11:30-12:00 | 仕上げ | UI改善、バグ修正 |
| 12:00-13:00 | **昼休み + ビルド開始** | `eas build` を昼前に実行して待ち時間活用 |
| 13:00-14:30 | EAS Build + TestFlight | 講師が1人分デモ→全員一斉 |
| 14:45-15:30 | テスター招待 + 相互インストール | |
| 15:30-16:00 | 1週間の総振り返り | |

**Day 5の最大リスク**: ビルドエラー
- 証明書エラー → **講師が巻き取る**
- Bundle ID重複 → 受講者名を入れて一意にする
- ビルド時間 → EAS Production plan で短縮 + 昼休みにぶつける

---

## 8. Week 2 実施ガイド（Day 6-7 + 個人開発）

### Day 6: 要件定義ワークショップ

**参照**: `curriculum/day6-requirements.md`

**前日準備**:
- [ ] `templates/requirements-template.md` を受講者に共有（Slack or Notion）
- [ ] `templates/persona-canvas.md` を共有
- [ ] 推奨プロジェクト候補（Day 6ファイル内）を確認

**講師の役割**: **スコープ管理**
- 受講者のアイデアが膨らみすぎないよう、MVPを厳格に制限
- **画面3つ以内、テーブル2つ以内**
- 「それはMVPから外す」と明確にジャッジ

### Day 7: 技術設計 + 実装開始

**参照**: `curriculum/day7-project-start.md`

- Supabaseテーブル設計（Claudeに壁打ち→ダッシュボードGUIで作成）
- `templates/expo-starter/` をコピーして個人PJ開始
- 午後から実装開始

### Day 8-10（Week 2 残り）: 個人開発

**参照**: `curriculum/week2-individual-dev.md`

**デイリーリズム**:

| 時間 | 内容 |
|------|------|
| 9:00-9:15 | 朝会（進捗・今日のゴール・困りごと） |
| 9:15-12:00 | 実装（**15分/人ローテーション相談**） |
| 13:00-15:00 | 実装続き |
| 15:00-15:30 | ペアレビュー |
| 15:30-16:00 | 夕会（成果発表3分/人） |

**講師のローテーション**: 15分×5人＝75分/ラウンド。午前・午後で各1-2ラウンド。
残り時間は受講者が「AI→ペア」で自走。

**Week 2 水曜日**: **中間ビルド必須**
- `eas build` を通して、ビルドエラーを早期発見
- ここで問題が出れば最終週までに修正可能

---

## 9. Week 3 実施ガイド（仕上げ・発表）

**参照**: `curriculum/week3-polish-launch.md`

### Week 3 前半（月-水）

- アプリの仕上げ
- TestFlight配布（個人アプリ）
- 5人が互いにテスト + `templates/feedback-form.md` でフィードバック
- フィードバックをClaudeで分析→改善優先順位決定

### Week 3 後半（木-金）

- フィードバック反映・最終修正
- App Store用スクリーンショット・説明文をClaudeで作成
- **金曜午後: 最終成果発表会**（経営層向け）

### 最終成果物チェック

- [ ] 動作するiOSアプリ（TestFlight配布済み）
- [ ] GitHubリポジトリ
- [ ] 要件定義書
- [ ] テストフィードバックレポート
- [ ] `guides/next-app-checklist.md` を全員に配布（研修後の自走力担保）

---

## 10. 研修後フォローアップ

**参照**: `followup/weekly-mokumoku-plan.md`, `followup/knowledge-sharing-setup.md`

| タイミング | 施策 |
|-----------|------|
| 毎週金曜30分 | もくもく会（自主制作+質問） |
| 2週間後 | 「業務改善アプリ」企画発表 |
| 1ヶ月後 | 個別1on1 |
| 2ヶ月後 | ミニハッカソン |
| 3ヶ月後 | 成果発表会（経営層向け） |

### Notionナレッジ共有の立ち上げ

`followup/knowledge-sharing-setup.md` に従い、以下をNotionに作成:
- `AIプロンプト集` データベース
- `開発Tips` ページ
- 各自の「自分用マニュアル」ページ

---

## クイックリファレンス: 困ったときに

### 受講者が詰まった → 「AI→ペア→講師」の3段階ルール

1. まずCursor Chat or Claude Proに質問
2. 5分以内に解決しなければ隣の人に相談
3. それでもダメなら講師を呼ぶ

### 進度差が出た → ペア編成 + バッファタスク

- 早い人と遅い人をペアにする
- 早く終わった人には `templates/buffer-tasks.md` を渡す
- **全員同じステップを同時進行**（Day 1-5は個別ペース不可）

### 脱落しそうな人がいる → 代替ゴール

- コーディングは見学+ペアの補助に切り替え
- AIツール活用（企画・調査・ドキュメント作成）に専念
- 成果発表では企画書+調査レポートでもOK

### ビルドが通らない → 講師が巻き取る

- TestFlight/証明書関連は100%講師が対応
- 受講者に解決させようとしない（時間の無駄）

### Supabaseが止まった → Free planの制限

- 1週間非アクティブでpause → ダッシュボードから再開
- 2プロジェクト制限 → 各自個別アカウントで回避
