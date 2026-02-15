---
title: "Day 5: TestFlight配信"
order: 6
category: "day"
description: "アプリをTestFlightで実機テスト・配信する"
---

# Day 5: Git + セキュリティ + TestFlight

## ゴール
- Gitでコードをクラウドに保存する
- APIキーの安全な管理方法を学ぶ
- RLSで自分のデータだけ見えるように設定する
- 共通アプリをTestFlightで配布する

## 新概念
- Git（バージョン管理）
- セキュリティ（APIキー、.env.local、.gitignore）
- RLS（Row Level Security）
- ビルド + 配布（iOS開発の最終工程）

---

## タイムテーブル

| 時間 | 内容 | 形式 | 所要 |
|------|------|------|------|
| 9:00-9:15 | 朝の復習 + ミニティーチャー | 全体 | 15分 |
| 9:15-9:30 | ミニ座学: Gitとは（提案書のバージョン管理と同じ） | 全体 | 15分 |
| 9:30-10:15 | CursorのGit機能でcommit→push→GitHub上で確認 | 全体→個人 | 45分 |
| 10:15-10:30 | 休憩 | - | 15分 |
| 10:30-11:00 | セキュリティ基礎: APIキー、.env.local、.gitignore | 全体 | 30分 |
| 11:00-11:30 | Supabase RLS: ログインした人のデータだけ見えるようにする | 全体→実演 | 30分 |
| 11:30-12:00 | 共通アプリの最終仕上げ（UI改善、バグ修正） | 個人 | 30分 |
| 12:00-13:00 | 昼休み（**ビルドをここで開始して待ち時間を活用**） | - | 60分 |
| 13:00-14:30 | EAS Build設定 → iOSビルド → TestFlightアップロード | 全体→個人 | 90分 |
| 14:30-14:45 | 休憩 | - | 15分 |
| 14:45-15:30 | ビルド完了確認 → テスター招待 → 互いのアプリをインストール | 全体 | 45分 |
| 15:30-16:00 | 1週間の総振り返り + 来週の説明 | 全体 | 30分 |

---

## 朝の復習（9:00-9:15）

### Day 4 の成果確認

**目的**: Day 4で作ったメモアプリの完成度を確認する

#### チェック項目

1. **アプリの動作確認**（10分）
   - [ ] ローカルで `npx expo start` が起動する
   - [ ] ログイン・ログアウトが正常に動作する
   - [ ] メモの追加・削除ができる

2. **問題があれば修正**（5分）
   - エラーがある場合はSlackで質問
   - 軽微なバグは午前中に修正

#### 完了チェックポイント

- [ ] アプリが正常に動作している
- [ ] メモのCRUD操作が全て動く

---

## 午前1: Git基礎（9:15-10:15）

### Git とは？

**Git = コードのタイムマシン**

ビジネス文書のバージョン管理と同じです:
```
企画書_v1.docx
企画書_v2_田中修正.docx
企画書_v3_最終版.docx
企画書_v4_最終版2.docx ← これを防ぐのがGit
```

**覚えるのは4つだけ**:

| 操作 | やること | 営業に例えると |
|------|---------|--------------|
| **commit** | セーブポイントを作る | 「v1完成」とメモを残す |
| **push** | クラウドにアップロード | Google Driveに保存 |
| **pull** | 最新版をダウンロード | 共有フォルダから取得 |
| **差分確認** | 何が変わったか見る | 赤ペン校正のイメージ |

### CursorのGit機能で操作

#### 1. Source Controlパネルを開く

Cursorのサイドバーで「Source Control」アイコン（分岐マーク）をクリックするか、`Cmd + Shift + G` で開きます。

#### 2. リポジトリを追加

まだGitリポジトリでない場合:
1. Source Controlパネルで「Initialize Repository」をクリック
2. GitHubにpushするために「Publish Branch」をクリック

#### 3. 変更をコミット

1. コードを編集して保存する
2. Source Controlパネルに変更されたファイルが表示される
3. 変更内容を確認し、「+」ボタンでステージング
4. コミットメッセージ欄の✨（Sparkle）アイコンをクリックするとAIがメッセージを自動生成
5. 「Commit」ボタンをクリック

#### 4. GitHubにpush

1. Source Controlパネルの「...」メニューから「Push」を選択
2. またはステータスバーの同期アイコンをクリック

#### 5. GitHub上で確認

1. ブラウザで https://github.com にアクセス
2. 自分のリポジトリを開く
3. pushしたコードが表示されているか確認

### 今日は教えないこと

- ブランチ（mainのみ使用。各自別リポジトリ）
- マージ・リベース・コンフリクト

---

## 午前2: セキュリティ基礎（10:30-11:00）

### APIキーとは

サービスにアクセスするための「鍵」です。

**営業に例えると**: 取引先の担当者直通電話番号のようなもの。知っている人だけがアクセスできる。漏洩すると悪用される可能性があります。

### コードに直接書かない

#### ❌ ダメな例

```typescript
const supabaseUrl = 'https://abcdefg.supabase.co'; // NG! コードに直接書いている
const supabaseKey = 'eyJhbGc...'; // NG!
```

#### ✅ 良い例（.env.localを使う）

```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // OK! 環境変数から読む
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY; // OK!
```

> Day 3で `.env.local` ファイルにURL等を書いたのは、このセキュリティのためです。

### .gitignore の確認

`.gitignore` は「Gitにアップロードしないファイルのリスト」です。

Cursorの左側のファイル一覧から `.gitignore` ファイルを開き、以下が含まれていることを確認してください:

```
.env.local
.env*.local
```

> これにより、GitHubにAPIキーがアップロードされるのを防ぎます。

---

## 午前3: Supabase RLS（11:00-11:30）

### RLS とは

「ログインした人のデータだけ見えるようにする」仕組みです。

今の状態: 全員のメモが全員に見える（危険！）
RLS設定後: 自分のメモだけ見える（安全！）

### RLS 設定手順

#### 1. user_idのデフォルト値を設定

1. Supabaseダッシュボードで **Table Editor** → `memos` テーブルを開く
2. `user_id` カラムの右の「...」→「Edit column」をクリック
3. **Default Value** に `auth.uid()` と入力
4. **Save**

#### 2. RLSを有効化

1. テーブルの設定で **Enable RLS** をクリック
2. 確認ダイアログで **Enable**

#### 3. ポリシーを作成

Supabaseダッシュボードの左メニューから **SQL Editor** をクリックし、**New query** をクリックします。

以下のSQL文を**全てコピー**して、エディタに**貼り付け**て、**Run** ボタンをクリックしてください。

> SQLの意味が分からなくても大丈夫です。「ログインした人だけ自分のメモを読み書きできる」というルールを設定しています。

```sql
CREATE POLICY "ユーザーは自分のメモだけ見れる"
ON memos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のメモを作成できる"
ON memos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のメモを更新できる"
ON memos FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のメモを削除できる"
ON memos FOR DELETE
USING (auth.uid() = user_id);
```

「Success」と表示されればOKです。

#### 4. 動作確認

1. アプリでログインしてメモを確認
2. RLS設定前と同じメモが表示されることを確認
3. 別のアカウントでログインし、先ほどのメモが**見えない**ことを確認

---

## 午後の準備: 共通アプリの仕上げ

### チェックリスト

実機テスト前の最終確認:

- [ ] ログイン・ログアウトが動作する
- [ ] データの追加・編集・削除ができる
- [ ] RLSで自分のデータだけ表示される
- [ ] エラーハンドリングがある（通信エラー時など）
- [ ] ローディング表示がある
- [ ] アプリ名とアイコンが設定されている

### UI改善のポイント

1. **エラー表示**: ユーザーに何が起きたか伝える
2. **ローディング**: 処理中であることを示す
3. **空状態**: データがない時のメッセージ
4. **フィードバック**: ボタンを押したら反応がある

---

## EAS Build セットアップ

### EAS（Expo Application Services）とは

- Expoアプリをビルドするクラウドサービス
- MacがなくてもiOSアプリをビルドできる
- 自動でApp Store Connectにアップロード

### 前提条件（全てWeek 0で準備済みのはずです。未完了の場合はSlackで相談）

1. **Apple Developer Program**: 会社のアカウントに全員がメンバー追加済み
2. **Expo アカウント**: [expo.dev](https://expo.dev) で無料作成済み（未作成の場合はここで作成）
3. **EAS CLI**: `npm install -g eas-cli` でインストール済み
4. **App Store Connect**: Apple Developer Programと同じApple IDでアクセス可能

---

## 1. EAS CLI インストール

```bash
npm install -g eas-cli
```

ログイン:

```bash
eas login
```

---

## 2. プロジェクト設定

### eas.json の作成

プロジェクトルートで:

```bash
eas build:configure
```

`eas.json` が自動生成される:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true,
      "ios": {
        "buildType": "app-store"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-email@example.com",
        "ascAppId": "後で入力（App Store Connectでアプリ作成後に取得）",
        "appleTeamId": "Slackで案内されるチームID"
      }
    }
  }
}
```

**設定値の確認方法**:

| 項目 | どこで確認するか |
|------|----------------|
| `appleId` | Apple Developer Programに登録したメールアドレス |
| `appleTeamId` | Slackで全員に同じ値が案内されます |
| `ascAppId` | この後のApp Store Connect設定（ステップ3）でアプリを作成した後に確認します |

> `ascAppId` は今すぐ埋められません。ステップ3の後に戻って記入します。

### app.json の設定

```json
{
  "expo": {
    "name": "メモアプリ",
    "slug": "memo-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.memoapp",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.memoapp"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

**重要**: `bundleIdentifier` は世界中で一意である必要があります。
以下のルールで設定してください: `com.会社名.自分の名前.アプリ名`

**例**: `com.dotconf.tanaka.memoapp`

> `yourcompany` と書いてある部分を**全て**自分の値に置き換えてください。

---

## 3. App Store Connect 設定

### App作成

1. [App Store Connect](https://appstoreconnect.apple.com/) にアクセス
2. **My Apps** → **+** → **New App**
3. 必要情報を入力:
   - **Platform**: iOS
   - **Name**: メモアプリ
   - **Primary Language**: Japanese
   - **Bundle ID**: `app.json` の `bundleIdentifier` と同じ
   - **SKU**: 任意（例: `memo-app-001`）
   - **User Access**: Full Access
4. **Create**

### App情報の入力

後でビルド後に設定するため、今は作成のみでOK

---

## 4. iOSビルド実行

### ビルドコマンド

```bash
eas build --platform ios --profile production
```

### ビルドプロセス

1. **Apple Developer Program確認**: 初回のみ、Apple IDとチームIDを入力
2. **認証情報の生成**: 自動でProvisioning ProfileとCertificateを生成
3. **クラウドでビルド**: 15〜30分かかる
4. **App Store Connectにアップロード**: 自動

### ビルド状況の確認

```bash
eas build:list
```

または:

- [expo.dev](https://expo.dev/) にログイン
- **Builds** タブで進捗確認

---

## 5. TestFlight設定

### ビルド完了後

1. App Store Connectで **TestFlight** タブを開く
2. ビルドが表示されるまで5〜10分待つ
3. 初回のみ **Export Compliance（輸出規制）** に回答: ビルド提出時に「暗号化を使用していますか？」と聞かれます。
   - **「Yes」を選択**してください
   - 次に「暗号化は免除対象に該当しますか？」と聞かれたら **「Yes」を選択**
   - 理由: アプリがHTTPS通信を使用しているため（Supabaseとの通信）。ただしこれは標準的な暗号化であり、免除対象です。
   - > 迷ったらSlackで確認してください。
4. ステータスが **Ready to Test** になるのを待つ

### テスターグループ作成

1. **TestFlight** → **App Store Connect Users** を開く
2. **+** → 自分のメールアドレスを追加
3. または **External Testers** → **Create Group**:
   - Group Name: `ベータテスター`
   - **+** でテスターを追加（メールアドレス）
4. ビルドを選択して有効化

### テスター招待

1. テスターにメールが送信される
2. TestFlightアプリをインストール（App Storeから無料DL）
3. 招待メールのリンクをタップ
4. アプリをインストール

---

## 6. 実機でテスト

### TestFlightアプリの使い方

1. **App Store** から **TestFlight** をインストール
2. 招待メールのリンクを開く
3. **Accept** → **Install**
4. ホーム画面にアプリが表示される

### テストのポイント

- [ ] アプリが起動する
- [ ] ログインできる
- [ ] データの追加・編集・削除ができる
- [ ] 通信エラー時の挙動を確認（機内モードで）
- [ ] 画面の回転（対応している場合）
- [ ] バックグラウンドから復帰

---

## トラブルシューティング

### ビルドが失敗する

**エラー: "Bundle identifier is not available"**

- `app.json` の `bundleIdentifier` が既に使われている
- 一意の識別子に変更（例: 名前を追加）

**エラー: "No valid code signing certificate"**

- Apple Developer Programに登録されているか確認
- EAS CLIで再度認証: `eas credentials`

### TestFlightにビルドが表示されない

- App Store Connectで **Processing** 状態なら待つ（最大30分）
- Bundle IDが一致しているか確認
- Export Complianceに回答したか確認

### TestFlightアプリにアプリが表示されない

- 招待メールのリンクをタップしたか確認
- App Store Connectでテスターが追加されているか確認
- TestFlightアプリを再起動

---

## ミニティーチャー + 1週間の総振り返り（15:30-16:00）

### ミニティーチャー（5分）

**テーマ**: Day 4で学んだ「Supabase Auth」または「Git」を自分の言葉で説明

---

## 1週間の総振り返り

### 学んだこと

| Day | テーマ | 主な内容 |
|-----|--------|----------|
| Day 1 | AI基礎 + ツール体験 | ChatGPT/Claude比較、Cursorの4機能、Hello Worldアプリ |
| Day 2 | UIと状態管理 | state、カウンターアプリ、ToDoリストアプリ |
| Day 3 | バックエンド入門 | Supabase接続、CRUD操作、デバッグ基礎 |
| Day 4 | 認証（Auth） | Expo Router、Supabase Auth、メモアプリCRUD |
| Day 5 | Git + セキュリティ + TestFlight | Git、RLS、EAS Build、TestFlight配布 |

### 成果物

- [ ] ログイン機能付きメモアプリ
- [ ] GitHubリポジトリ
- [ ] TestFlightで配布されたiOSアプリ
- [ ] 実機でアプリが動作

### Next Steps（Week 2 へ）

来週から個人プロジェクト開発:

1. **Day 6（月）**: 要件定義ワークショップ
2. **Day 7（火）**: 技術設計 + 実装開始
3. **Day 8-10（水-金）**: 個人開発

---

## 参考資料

### EAS Build

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)

### デバッグツール

- **Expo Dev Tools**: `npx expo start`
- **React Native Debugger**: Chrome DevTools
- **Flipper**: ネイティブデバッグ

---

## まとめ

今日学んだこと:

1. **Git**: コードのバージョン管理（CursorのGit機能）
2. **セキュリティ**: APIキーの安全な管理
3. **RLS**: データのアクセス制御
4. **EAS Build**: iOSアプリのビルド
5. **TestFlight**: アプリの配布

来週: 個人プロジェクトの企画と開発開始！
