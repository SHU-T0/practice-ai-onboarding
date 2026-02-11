# TestFlight公開手順書

## 前提条件

以下が完了していることを確認してください（Week 0で講師が設定済み）:

- **Apple Developer Program**: 会社のApple Developerアカウントのチームメンバーに追加されていること
  - 確認方法: https://developer.apple.com にログインし、メンバーシップが表示されればOK
  - ※ 未追加の場合は講師に連絡
- **EAS CLI**: ターミナルで `eas --version` を実行し、バージョンが表示されること
  - 表示されない場合: `npm install -g eas-cli` を実行
- **EAS ログイン**: `eas login` でExpoアカウントにログイン済みであること
  - 確認方法: `eas whoami` でユーザー名が表示されればOK
- **app.json の bundleIdentifier**: `com.会社名.自分の名前.アプリ名` の形式で設定済みであること
  - 例: `com.mycompany.tanaka.memoapp`
  - ※ この値は世界で一意である必要があります。他の人と被らないようにしてください

> **わからない場合は講師に聞いてください。** TestFlight関連の設定はトラブルが起きやすいため、100%講師がサポートします。

## Step 1: EAS Buildの設定

1. eas.jsonが存在することを確認
2. app.jsonのios.bundleIdentifierを設定
   - ルール: `com.会社名.受講者名.アプリ名`
3. `eas login` でログイン
4. `eas build:configure` で初期設定

## Step 2: iOSビルドの実行

1. ターミナル（Cursor内）で以下を実行:
   ```
   eas build --platform ios --profile production
   ```
2. Apple IDとパスワードの入力を求められる
3. ビルド開始 → 完了まで15-30分程度待つ
4. EAS ダッシュボードでビルドの進捗を確認

## Step 3: App Store Connectでの設定

1. App Store Connect (https://appstoreconnect.apple.com) にログイン
2. 「マイApp」→ 対象アプリを選択
3. 「TestFlight」タブを開く
4. ビルドが表示されるのを待つ（ビルド完了後数分かかる場合あり）

## Step 4: テスターの招待

1. TestFlightタブ → 「外部テスター」
2. 「新規グループ」→ グループ名を入力（例: 「研修メンバー」）
3. テスターのメールアドレスを追加
4. テスト対象のビルドを選択
5. 「テストの開始」をクリック

## Step 5: テスターがアプリをインストール

1. テスターにメールが届く
2. TestFlightアプリをインストール（初回のみ）
3. メール内のリンクからアプリをインストール

## よくあるトラブルと対処法

| トラブル | 対処法 |
|---------|--------|
| ビルドが失敗する | エラーログを確認。bundle identifierの重複が多い |
| 証明書エラー | 講師に相談。Apple Developer設定を確認 |
| ビルドがApp Store Connectに表示されない | 10分待つ。`eas submit`で手動アップロードも可 |
| テスターにメールが届かない | 迷惑メールを確認。Apple IDのメールアドレスで再試行 |
