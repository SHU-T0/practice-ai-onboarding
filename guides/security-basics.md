# セキュリティ基礎ガイド（APIキー、RLS）

## なぜセキュリティが重要？

APIキーが漏洩すると、他人があなたのデータベースに自由にアクセスできてしまう。
顧客の個人情報が漏洩する最悪のケースも。

## APIキーとは？

- アプリがSupabaseに接続するための「合言葉」
- これが漏れると、誰でもあなたのDBにアクセスできる
- 絶対にコードに直接書かない！

## .env.localの使い方

1. プロジェクトのルートに `.env.local` ファイルを作成
2. APIキーを記載:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. `.gitignore` に `.env.local` が含まれていることを確認
4. コード内では `process.env.EXPO_PUBLIC_SUPABASE_URL` で参照

## やってはいけないこと

- ❌ コードに直接APIキーを書く
- ❌ .env.localをGitにcommitする
- ❌ APIキーをSlackやメールで送る
- ❌ スクリーンショットにAPIキーが映った状態でシェア

## RLS（Row Level Security）とは？

「ログインした人のデータだけ見えるようにする」仕組み。

### RLSが無い場合

→ Aさんのデータを、Bさんも見れてしまう

### RLSがある場合

→ Aさんは自分のデータだけ、Bさんも自分のデータだけ見える

## RLSの最低限の設定

1. Supabase ダッシュボード → Table Editor → 対象テーブル
2. 「RLS enabled」をONにする
3. 「New Policy」→ テンプレートから選択
4. 「Enable read access for authenticated users only」を選択
5. ポリシーを保存

研修初期段階では: RLSをOFFのままで開発を進め、Day 4でONにする。

### 具体的なポリシー設定例

#### ログインユーザーのみ読み取り可能にする

1. 「New Policy」をクリック
2. 「Create a new policy from scratch」を選択
3. 以下を設定:
   - Policy name: `ログインユーザーのみ読み取り可能`
   - Allowed operation: `SELECT`
   - Target roles: `authenticated`
   - USING expression: `true`
4. 「Save policy」をクリック

#### 自分のデータのみ読み書き可能にする

テーブルに `user_id` カラム（uuid型）を追加した上で:

1. 「New Policy」をクリック
2. 以下を設定:
   - Policy name: `自分のデータのみ読み取り`
   - Allowed operation: `SELECT`
   - USING expression: `auth.uid() = user_id`
3. INSERT用のポリシーも追加:
   - Policy name: `自分のデータのみ追加`
   - Allowed operation: `INSERT`
   - WITH CHECK expression: `auth.uid() = user_id`

> **研修のタイミング**: Day 3まではRLSをOFFで開発。Day 4のAuth実装後にRLSをONにして設定します。
