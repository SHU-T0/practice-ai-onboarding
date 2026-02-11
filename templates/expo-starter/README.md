# Expo + Supabase スタータープロジェクト

このプロジェクトは、Expo (React Native) と Supabase を使ったモバイルアプリの最小構成です。
1週間でアプリを作るための土台として使ってください。

---

## 構成

- **Expo SDK 52**: 最新のExpoフレームワーク
- **Expo Router**: ファイルベースのナビゲーション
- **TypeScript**: 型安全（strictモードはOFF）
- **Supabase**: バックエンド（Auth + Database + Storage）
- **StyleSheet**: React Nativeの標準的なスタイリング（NativeWindは使わない）

---

## フォルダ構成

```
.
├── app/                  # Expo Routerの画面ファイル
│   ├── _layout.tsx      # ルートレイアウト（ナビゲーション設定）
│   └── index.tsx        # ホーム画面
├── lib/                 # 共通ロジック
│   └── supabase.ts      # Supabaseクライアントの初期化
├── assets/              # 画像ファイルなど
├── app.json             # Expoの設定ファイル
├── eas.json             # EAS Buildの設定ファイル
├── tsconfig.json        # TypeScriptの設定
├── package.json         # 依存パッケージ
└── .env.local           # 環境変数（Supabaseの接続情報）
```

---

## セットアップ手順

### 1. プロジェクトのコピー

このフォルダをコピーして、新しいプロジェクトを作成します。

```bash
# フォルダをコピー
cp -r templates/expo-starter my-app

# 新しいプロジェクトに移動
cd my-app
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. Supabaseプロジェクトの作成

1. https://supabase.com/ にアクセス
2. 「New Project」をクリック
3. プロジェクト名を入力（例: my-app）
4. データベースのパスワードを設定
5. リージョンは「Northeast Asia (Tokyo)」を選択
6. 「Create new project」をクリック

### 4. Supabaseの接続情報を取得

1. Supabaseのダッシュボードで「Settings」→「API」を開く
2. 以下の2つをコピー:
   - **Project URL**
   - **anon public key**

### 5. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成します。

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて、Supabaseの接続情報を貼り付けます。

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. アプリの起動

```bash
npm start
```

または

```bash
npx expo start
```

QRコードが表示されるので、Expo Goアプリでスキャンしてください。

---

## 各ファイルの説明

### `app.json`

Expoの設定ファイルです。アプリ名、アイコン、Bundle IDなどを設定します。

**変更が必要な箇所**:
- `name`: アプリの表示名
- `slug`: アプリの識別子（URLで使われる）
- `ios.bundleIdentifier`: iOS用のBundle ID（例: `com.company.username.myapp`）

### `eas.json`

EAS Build（Expoのビルドサービス）の設定ファイルです。

**変更が必要な箇所**:
- `submit.production.ios.appleId`: あなたのApple ID
- `submit.production.ios.ascAppId`: App Store ConnectのアプリID
- `submit.production.ios.appleTeamId`: Apple Developer Team ID

### `tsconfig.json`

TypeScriptの設定ファイルです。

**特徴**:
- `strict: false` → エラーが出にくく、初心者でも扱いやすい
- `paths` → `@/` で絶対パスをインポートできる（例: `import { supabase } from '@/lib/supabase'`）

### `lib/supabase.ts`

Supabaseクライアントを初期化するファイルです。

**使い方**:
```typescript
import { supabase } from '@/lib/supabase'

// データを取得
const { data, error } = await supabase.from('tasks').select()
```

### `app/_layout.tsx`

アプリ全体のレイアウトを設定するファイルです。
Expo Routerの `<Stack>` で画面遷移を管理します。

### `app/index.tsx`

ホーム画面のファイルです。
ここから自分のアプリを作り始めましょう！

---

## よく使うコマンド

### 開発サーバーの起動

```bash
npm start
```

### iOSシミュレータで起動

```bash
npm run ios
```

### Androidエミュレータで起動

```bash
npm run android
```

### EAS Buildでアプリをビルド

```bash
# 開発用ビルド
eas build --profile development --platform ios

# TestFlight用ビルド
eas build --profile preview --platform ios

# 本番用ビルド
eas build --profile production --platform ios
```

### TestFlightに配信

```bash
eas submit --platform ios
```

---

## 次のステップ

1. **要件定義を完成させる**: `templates/requirements-template.md` を使う
2. **ペルソナを作る**: `templates/persona-canvas.md` を使う
3. **画面を作る**: `app/` フォルダに新しいファイルを追加
4. **Supabaseのテーブルを作る**: Supabaseのダッシュボードで「Table Editor」を開く
5. **データを表示する**: `lib/supabase.ts` を使ってデータを取得

---

## トラブルシューティング

### `EXPO_PUBLIC_SUPABASE_URL` が undefined になる

→ `.env.local` を作成し、Supabaseの接続情報を設定してください。
→ 設定後、開発サーバーを再起動してください（`Ctrl + C` → `npm start`）。

### `expo-router` が見つからない

→ `npm install` を実行して、依存パッケージをインストールしてください。

### iOSシミュレータでアプリが起動しない

→ Xcodeがインストールされているか確認してください。
→ `xcode-select --install` でコマンドラインツールをインストールしてください。

### Androidエミュレータでアプリが起動しない

→ Android Studioがインストールされているか確認してください。
→ エミュレータが起動しているか確認してください。

---

## 参考リンク

- **Expo公式ドキュメント**: https://docs.expo.dev/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **Supabase公式ドキュメント**: https://supabase.com/docs
- **React Native公式ドキュメント**: https://reactnative.dev/

---

## Tips

- **画面を追加するときは `app/` フォルダに新しいファイルを作成**: `app/settings.tsx` → `/settings` にアクセスできる
- **Supabaseのテーブルを変更したらRLSを設定**: セキュリティのため、Row Level Security（RLS）を必ず有効にする
- **エラーが出たらClaude に聞く**: エラーメッセージをコピーして「このエラーを解決してください」と聞く

---

このスタータープロジェクトを使って、素敵なアプリを作りましょう！
