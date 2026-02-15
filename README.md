# AI駆動型モバイル開発研修プログラム

**講師の方へ**: まず [INSTRUCTOR-GUIDE.md](./INSTRUCTOR-GUIDE.md) をお読みください。研修の進め方・準備手順がまとまっています。

**受講者の方へ**: インタラクティブなチュートリアルアプリで学習を進められます。
```bash
cd web && npm install && npm run dev
```
詳しくは [web/README.md](./web/README.md) を参照してください。

## 研修概要

営業・ビジネス系メンバー5名（IT/AI基礎知識なし）を対象に、AIを武器にiOSアプリ・Web・業務自動化を一人で完結できるジェネラリストに育成する短期集中研修。

### 受講者プロファイル
- 営業・ビジネス職（IT/AIの基礎知識なし）
- 全員Mac所持
- 研修期間中は完全専念
- 対面形式
- 講師1名体制

### 研修ゴール
既存のExpo + Supabase基盤を活用し、短期集中（座学数日 + 開発2-3週間）で以下を実現:
- AIツールを使いこなした自律的なアプリ開発
- 実際のビジネス課題を解決するアプリをリリース
- TestFlightでの配布とユーザーフィードバック収集

## 全体構成（3週間+α）タイムライン

### Week 0（前日まで）: 環境構築・Mac検証
**所要時間: 数日〜1週間**

- 全Mac端末の検証とセットアップ
- 開発環境の構築とテスト
- アカウント設定と権限付与
- 教材の最終確認

⚠️ **注意**: この準備だけで数日〜1週間かかります。講師の工数を確保すること。

### Week 1: 基礎習得（Day 1-5）

#### Day 1: AI基礎 + ツール体験
- AIの基本概念と業務での活用
- Cursor + Expoの初回体験
- 「Hello World」アプリを作る

#### Day 2: Cursor + Expo入門（UI・state）
- UIコンポーネントの作成
- 状態管理（state）の理解
- カウンターアプリ、ToDoアプリ制作

#### Day 3: Supabase（DB読み書き）+ デバッグ基礎
- Supabaseプロジェクトのセットアップ
- データベースの基本操作（SELECT、INSERT、DELETE）
- デバッグ手法の習得

#### Day 4: Supabase Auth（認証）
- ユーザー認証の実装
- Expo Routerへの移行
- メモアプリのCRUD完成

#### Day 5: Git + セキュリティ + TestFlight
- Gitの基本とCursorのGit機能
- セキュリティ基礎とRLS設定
- EASでのビルドとTestFlight配布

#### Day 6-7: 要件定義ワークショップ + 個人プロジェクト企画
- ビジネス課題の発掘
- アプリ企画の立案
- 要件定義書の作成
- 開発計画の策定

### Week 2: 実プロジェクト開発
- 各自の実プロジェクト開発
- メンターによる伴走サポート
- 日次スタンドアップ（進捗共有）
- ペアプログラミングセッション

### Week 3 前半: 実装仕上げ + フィードバック収集
- 実装の仕上げ
- TestFlight配布
- ユーザーフィードバック収集
- バグ修正と改善

### Week 3 後半: 改善 + 最終デモ + 事業化判定
- フィードバックに基づく改善
- 最終プレゼンテーション
- 事業化可能性の評価
- 今後のロードマップ策定

## ツールスタック

### 月額コスト: 約10,000円/人

| ツール | 月額 | 用途 |
|--------|------|------|
| Cursor Pro | ~3,000円 | AI支援コーディング |
| Claude Pro | ~3,000円 | 壁打ち・ドキュメント生成 |
| v0 Premium | ~3,000円 | Web UI生成 |
| Xcode | 無料 | iOSビルド環境 |
| CursorのGit機能 | Cursor内蔵 | Git GUI（Source Control） |
| Supabase Free | 無料 | バックエンド（DB、Auth） |
| EAS Production | ~$99/月（会社負担） | ビルド・配布基盤 |
| Make.com Free | 無料 | 業務自動化 |
| Notion | 無料 | タスク・ドキュメント管理 |
| Apple Developer | 会社契約済 | TestFlight配布 |

### 開発スタック
- **フロントエンド**: Expo (React Native)
- **バックエンド**: Supabase
- **認証**: Supabase Auth
- **ビルド・配布**: EAS (Expo Application Services)
- **バージョン管理**: GitHub
- **プロジェクト管理**: Notion

## ディレクトリ構成

```
practice-ai-onboarding/
├── README.md                              # このファイル
├── INSTRUCTOR-GUIDE.md                    # 講師向け実施手順書（最初に読む）
├── curriculum/                            # カリキュラム
│   ├── week0-setup-checklist.md           # 事前環境構築チェックリスト
│   ├── day1-ai-basics.md                  # Day 1: AI基礎 + ツール体験
│   ├── day2-ui-state.md                   # Day 2: UI・状態管理
│   ├── day3-supabase-db.md                # Day 3: Supabase DB読み書き
│   ├── day4-auth-git.md                   # Day 4: 認証 + Expo Router移行
│   ├── day5-testflight.md                 # Day 5: Git + セキュリティ + TestFlight
│   ├── day6-requirements.md               # Day 6: 要件定義ワークショップ
│   ├── day7-project-start.md              # Day 7: 個人プロジェクト開始
│   ├── week2-individual-dev.md            # Week 2: 個人開発ガイド
│   └── week3-polish-launch.md             # Week 3: 仕上げ・発表
├── templates/                             # テンプレート
│   ├── .cursorrules                       # Cursor Rules原本テキスト（参照用）
│   ├── requirements-template.md           # 要件定義テンプレート
│   ├── persona-canvas.md                  # ペルソナテンプレート
│   ├── feedback-form.md                   # TestFlightフィードバックフォーム
│   ├── buffer-tasks.md                    # 「講師待ち」時のバッファタスク集
│   └── expo-starter/                      # Expo + Supabaseスターター
│       ├── app.json, eas.json, tsconfig.json
│       ├── package.json
│       ├── .env.local.example
│       ├── lib/supabase.ts
│       └── app/_layout.tsx, app/index.tsx
├── guides/                                # ガイド・リファレンス
│   ├── ai-tools-comparison.md             # AI使い分けガイド
│   ├── cursor-cheatsheet.md               # Cursor操作早見表
│   ├── cursor-ai-settings.md              # CursorのAI設定ガイド（モデル・Rules・Agent・MCP）
│   ├── git-basics.md                      # Git最小限ガイド（CursorのGit機能）
│   ├── testflight-guide.md                # TestFlight公開手順
│   ├── supabase-quickstart.md             # Supabase入門ガイド
│   ├── prompt-cookbook.md                  # プロンプト集（営業向け実例）
│   ├── debug-basics.md                    # デバッグ基礎ガイド
│   ├── security-basics.md                 # セキュリティ基礎（APIキー、RLS）
│   ├── expo-router-diagram.md             # Expo Routerファイル構造図
│   └── next-app-checklist.md              # 「次のアプリを作るとき」チェックリスト
├── assessment/                            # 評価
│   ├── skill-check-rubric.md              # 実技チェック基準
│   └── self-assessment.md                 # 自己評価シート
└── followup/                              # フォローアップ
    ├── weekly-mokumoku-plan.md             # もくもく会計画
    └── knowledge-sharing-setup.md         # ナレッジ共有Notion設計
```

## 教育設計の原則

### AI→ペア→講師の3段階ルール

受講者が詰まった時の解決順序:

1. **AI (Cursor/Claude)**: まずAIに質問・相談
2. **ペア**: 隣の受講者と相談（5分以内）
3. **講師**: それでも解決しない場合のみ講師を呼ぶ

この順序により:
- 自律的な問題解決能力を養成
- 講師の時間を本質的な指導に集中
- AIツールの実践的な使い方を習得

### その他の重要原則

**座学は1回15分以内**
- 長時間の座学は避ける
- 座学→即実践のサイクルを回す

**エラーは学びの機会**
- エラー = 失敗ではなく「AIとの会話のきっかけ」
- 意図的にエラーを起こす課題も組み込む

**コードを書かない、AIに書かせる**
- 「プログラミング言語を覚える」マインドセットを捨てる
- 「AIに指示を出す」「何を作りたいか考える」に集中

**成功体験の積み重ね**
- Day 1で必ず動くものを作る
- 毎日「自分で作った」という実感を持たせる

## Day毎のマイルストーン（検証方法）

| Day | マイルストーン | 検証方法 |
|-----|---------------|----------|
| 1 | Hello Worldアプリ + ボタン付きアプリ | シミュレータでの動作確認 |
| 2 | カウンターアプリ + ToDoアプリ | 状態管理が正しく動作すること |
| 3 | Supabase連携アプリ（CRUD操作） | データがDBに保存されること |
| 4 | ログイン機能付きメモアプリ完成 | 認証フローの完走、メモのCRUD動作 |
| 5 | GitHubにpush + TestFlight配布完了 | GitHub上のコード確認、実機でアプリが起動 |
| 6-7 | 要件定義書 + 開発計画 | レビュー会での承認 |
| Week 2 | プロトタイプ完成 | 主要機能の動作デモ |
| Week 3 前半 | TestFlight配布 + フィードバック5件以上 | ユーザーテスト完了 |
| Week 3 後半 | 最終プレゼン | 事業化可能性の評価 |

## リスクと対策

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| Mac環境の不統一（OSバージョン、スペック） | 高 | 中 | Week 0で全端末を検証。最低スペック（RAM 16GB、空き50GB）を確保 |
| Xcodeビルドの失敗 | 高 | 高 | 事前にビルドテンプレートを用意。講師が全パターンを事前検証 |
| ネットワーク不安定 | 中 | 中 | オフライン資料を準備。ローカル環境でも動作可能な設定 |
| 個人差による進度のばらつき | 中 | 高 | ペアプログラミング推奨。追加課題と復習課題を準備 |
| Supabaseアカウント設定ミス | 中 | 中 | 講師が事前にテンプレートプロジェクトを作成。手順書を画面キャプチャ付きで |
| Apple Developer証明書の問題 | 高 | 中 | 事前に全員をApple Developerアカウントに追加。TestFlight配布権限を確認 |
| EASビルドの失敗 | 高 | 中 | 事前にビルド成功パターンを確認。エラーパターン集を準備 |
| モチベーション低下 | 中 | 低 | Day 1で成功体験。毎日の成果発表で達成感を演出 |
| 概念理解の不足（state、API等） | 中 | 中 | 座学を15分以内に。身近な例え（顧客リスト、Google Sheets等）で説明 |

## 最重要原則

### 初日の学習時間を環境構築で消費しない

- Week 0で完璧な環境を用意
- Day 1は9:00開始と同時に「AIを体感する」ところからスタート
- トラブルシューティングは事前に全パターン検証済み

### 講師の事前準備に時間をかける

- スターターテンプレートの動作検証
- 全Mac端末での動作確認
- エラーパターン集の作成
- 質問への回答集の準備

## 成果物

### 研修終了時の成果物

各受講者が以下を達成:

1. **個人プロジェクトアプリ（TestFlight配布済み）**
   - 実際のビジネス課題を解決
   - 最低5名以上のユーザーフィードバック

2. **技術ポートフォリオ**
   - GitHubリポジトリ
   - 開発プロセスのドキュメント
   - 要件定義書から最終報告まで

3. **プレゼンテーション**
   - 課題発見から解決までのストーリー
   - 技術選定の理由
   - 今後の展望

## サポート体制

### 研修期間中

- 日次スタンドアップ（朝15分）
- オフィスアワー（15:00-16:00）
- Slack #ai-builders での質問受付

### 研修後

- 月次フォローアップセッション
- Slackコミュニティでの継続サポート
- 追加リソースの提供

## 連絡先

質問・相談は Slack #ai-builders まで
