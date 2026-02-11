# Day 7: 技術設計 + 実装開始

## ゴール
- Supabaseのテーブルを作成する
- 画面構成を紙で整理する
- スタータープロジェクトから開発を開始する

## 今日の成果物
- Supabaseテーブル（本番環境）
- 画面ワイヤーフレーム（手書き）
- GitHubリポジトリ
- 実装開始（最低1画面）

---

## タイムテーブル

| 時間 | 内容 | 形式 |
|------|------|------|
| 9:00-9:05 | ミニティーチャー（Day 6の学び）担当: [受講者名A] | 全体 |
| 9:05-10:00 | Supabaseテーブル設計（Claude壁打ち→ダッシュボードで作成） | 個人(講師巡回) |
| 10:00-11:00 | 画面構成の整理（紙とペンでワイヤーフレーム。Figmaは使わない） | 個人 |
| 11:00-12:00 | スタータープロジェクトをコピー→自分のリポジトリにpush | 個人 |
| 12:00-13:00 | 昼休み | - |
| 13:00-16:00 | 実装開始（Cursorで。講師は15分/人のローテーション相談） | 個人(講師巡回) |

---

## 午前1: Supabaseテーブル設計

### Claudeに壁打ちする

> **用語メモ**:
> - **リレーション（関係）**: テーブル同士のつながり。例: 「顧客」テーブルと「訪問記録」テーブルは、顧客IDでつながっている
> - **外部キー**: テーブル間をつなぐための列。別のテーブルのIDを参照する
> - これらの用語を覚える必要はありません。Claudeがテーブル設計を提案してくれます。

**プロンプト例**:

```
以下のアプリの要件定義から、Supabaseのテーブル設計を提案してください。

[要件定義書の内容をコピー]

条件:
- テーブルは2つ以内
- 各テーブルに user_id カラムを含める（RLS用）
- created_at, updated_at を含める
- リレーションがある場合は外部キーを設定

以下の形式で出力してください:
1. テーブル名とカラム定義
2. リレーション図
3. RLSポリシーの設計
4. Supabase SQLで実行できるCREATE TABLE文
```

### テーブル設計の例

#### 例1: 社内ナレッジ共有アプリ

**テーブル1: tips**

| カラム名 | 型 | 制約 | 説明 |
|---------|------|------|------|
| id | uuid | PRIMARY KEY | 自動生成 |
| user_id | uuid | NOT NULL | 投稿者 |
| title | text | NOT NULL | タイトル |
| content | text | NOT NULL | 本文 |
| category | text | - | カテゴリ |
| created_at | timestamp | DEFAULT now() | 作成日時 |
| updated_at | timestamp | DEFAULT now() | 更新日時 |

**テーブル2: favorites**

| カラム名 | 型 | 制約 | 説明 |
|---------|------|------|------|
| id | uuid | PRIMARY KEY | 自動生成 |
| user_id | uuid | NOT NULL | お気に入り登録者 |
| tip_id | uuid | NOT NULL | 対象のTip |
| created_at | timestamp | DEFAULT now() | 登録日時 |

**リレーション**:
- `favorites.tip_id` → `tips.id` (外部キー)

---

#### 例2: 営業訪問ログアプリ

**テーブル1: customers**

| カラム名 | 型 | 制約 | 説明 |
|---------|------|------|------|
| id | uuid | PRIMARY KEY | 自動生成 |
| name | text | NOT NULL | 顧客名 |
| company | text | - | 会社名 |
| created_by | uuid | NOT NULL | 作成者 |
| created_at | timestamp | DEFAULT now() | 作成日時 |

**テーブル2: visits**

| カラム名 | 型 | 制約 | 説明 |
|---------|------|------|------|
| id | uuid | PRIMARY KEY | 自動生成 |
| customer_id | uuid | NOT NULL | 顧客ID |
| user_id | uuid | NOT NULL | 訪問者 |
| memo | text | - | メモ |
| photo_url | text | - | 写真URL |
| visited_at | timestamp | NOT NULL | 訪問日時 |
| created_at | timestamp | DEFAULT now() | 作成日時 |

**リレーション**:
- `visits.customer_id` → `customers.id`

---

### Supabaseでテーブル作成

#### 方法1: Table Editor（GUI）— 推奨（初心者向け）

Day 3と同じ手順で、Supabaseダッシュボードの **Table Editor** からテーブルを作成します。
テーブル名やカラム情報はClaude壁打ちの結果を参考にしてください。
RLSの有効化やポリシー設定は、Day 4で学んだ手順と同じです。

#### 方法2: SQL Editor（上級者・講師向け）

テーブルとRLSを一括で作成できます。
1. Supabase ダッシュボードの左メニューから **SQL Editor** をクリック
2. **New query** をクリック
3. 以下のSQLを**コピーして貼り付けて Run** をクリック:

```sql
-- テーブル1作成
CREATE TABLE tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- テーブル2作成
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  tip_id UUID REFERENCES tips(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, tip_id)
);

-- RLS有効化
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLSポリシー作成
CREATE POLICY "ユーザーは全てのTipsを閲覧できる" ON tips
  FOR SELECT USING (true);

CREATE POLICY "ユーザーは自分のTipsを作成できる" ON tips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のTipsを更新できる" ON tips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のTipsを削除できる" ON tips
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは全てのお気に入りを閲覧できる" ON favorites
  FOR SELECT USING (true);

CREATE POLICY "ユーザーは自分のお気に入りを作成できる" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のお気に入りを削除できる" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tips_updated_at BEFORE UPDATE ON tips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. **Run** をクリック（「Success」と表示されればOK）

> エラーが出たら、エラーメッセージをCursorのChatに貼り付けて質問してください。

---

### RLS設計のポイント

#### パターン1: 自分のデータのみ（プライベート）

```sql
-- 読み取り: 自分のデータのみ
CREATE POLICY "自分のデータのみ閲覧" ON table_name
  FOR SELECT USING (auth.uid() = user_id);

-- 作成: 自分のデータのみ
CREATE POLICY "自分のデータのみ作成" ON table_name
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 更新: 自分のデータのみ
CREATE POLICY "自分のデータのみ更新" ON table_name
  FOR UPDATE USING (auth.uid() = user_id);

-- 削除: 自分のデータのみ
CREATE POLICY "自分のデータのみ削除" ON table_name
  FOR DELETE USING (auth.uid() = user_id);
```

#### パターン2: 全員が閲覧、作成者のみ編集（パブリック）

```sql
-- 読み取り: 全員
CREATE POLICY "全員が閲覧可能" ON table_name
  FOR SELECT USING (true);

-- 作成: 認証済みユーザー
CREATE POLICY "認証済みユーザーが作成可能" ON table_name
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 更新: 作成者のみ
CREATE POLICY "作成者のみ更新可能" ON table_name
  FOR UPDATE USING (auth.uid() = user_id);

-- 削除: 作成者のみ
CREATE POLICY "作成者のみ削除可能" ON table_name
  FOR DELETE USING (auth.uid() = user_id);
```

---

## 午前2: 画面ワイヤーフレーム

### なぜ紙とペンか？

- **速い**: Figmaより早く試行錯誤できる
- **柔軟**: 細部にこだわらず全体像を描ける
- **共有しやすい**: 写真を撮ってSlackで共有

### ワイヤーフレームの描き方

#### 1. 画面一覧を書き出す

```
1. ログイン画面
2. Tips一覧画面
3. Tips詳細画面
4. Tips投稿画面
```

#### 2. 各画面の要素を書く

**Tips一覧画面の例**:

```
┌─────────────────────┐
│  Tips一覧           │
│  [検索バー]         │
├─────────────────────┤
│ □ カテゴリA         │
│ □ カテゴリB         │
├─────────────────────┤
│ [Tip 1]             │
│  タイトル           │
│  投稿者 | 日時      │
├─────────────────────┤
│ [Tip 2]             │
│  タイトル           │
│  投稿者 | 日時      │
├─────────────────────┤
│        ...          │
├─────────────────────┤
│     [+ 新規投稿]    │
└─────────────────────┘
```

#### 3. 画面遷移を矢印で繋ぐ

```
[一覧] → [詳細] → [編集]
   ↓
[投稿]
```

#### 4. データの流れを書く

```
[ログイン] → auth.uid() → Supabase
                         ↓
                    [Tips取得]
                         ↓
                    [一覧表示]
```

---

## 午前3: プロジェクトセットアップ

### プロジェクトの作成方法

Day 4で作った `memo-app` をベースに、個人プロジェクトを新しく作ります。

> **2つの選択肢**:
> - **推奨**: Day 4の `memo-app` をコピー（認証・DB接続が設定済みで楽）
> - **代替**: `templates/expo-starter/` をコピー（よりクリーンな状態から始めたい場合）
>
> `templates/expo-starter/` は、研修資料リポジトリ内にあります。講師からフォルダの場所を案内してもらってください。

#### 1. Day 4のプロジェクトをコピー

**方法A: Finderでコピー（簡単）**

1. Finderで「書類（Documents）」フォルダを開く
2. `memo-app` フォルダを選択
3. `Cmd + C`（コピー）→ `Cmd + V`（ペースト）
4. コピーされた `memo-app のコピー` フォルダの名前を、自分のアプリ名（英語）に変更

**方法B: ターミナルでコピー**

```bash
cd ~/Documents
cp -r memo-app my-app-name
cd my-app-name
```

> `my-app-name` の部分を自分のアプリ名（英語、スペースなし）に置き換えてください。例: `sales-log`, `knowledge-share`

> **パスについて**: Day 1から一貫して `~/Documents`（書類）フォルダで作業しています。全員同じ場所にプロジェクトを置くことで、講師のサポートがしやすくなります。

#### 2. 依存関係のインストール

```bash
npm install
```

#### 3. .env.local の更新

新しいSupabaseプロジェクトのURLとAPIキーに変更:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-new-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
```

#### 4. app.json の更新

```json
{
  "expo": {
    "name": "My App Name",
    "slug": "my-app-name",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.myappname"
    }
  }
}
```

#### 5. GitHubリポジトリ作成

1. GitHubで **New repository**
2. Repository name: `my-app-name`
3. Private にチェック
4. **Create repository**

#### 6. GitHub Desktopで接続

1. **File** → **Add Local Repository**
2. プロジェクトフォルダを選択
3. **Publish repository** でGitHubにプッシュ

---

## 午後: 実装開始

### Cursorの活用

#### 1. Cursorでプロジェクトを開く

```bash
cursor .
```

#### 2. AI Chat（Cmd + L）を使う

**プロンプト例**:

```
以下の要件で Tips一覧画面を実装してください:

- Supabaseから tips テーブルを取得
- FlatList で一覧表示
- 各アイテムに title, category, created_at を表示
- タップで詳細画面に遷移
- RLSが有効なので auth.uid() でフィルタリング不要

使用技術:
- React Native (Expo Router)
- Supabase
- TypeScript
```

#### 3. Composer（Cmd + I）でコード生成

- 複数ファイルを同時に編集
- 画面全体のコード生成に便利

---

### 実装の優先順位

> **今日の目標**: Phase 1とPhase 2まで到達すれば十分です。Phase 3以降はWeek 2で進めます。焦らず確実に。

#### Phase 1: 認証（Day 4のコードをそのまま活用）

Day 4で作った `memo-app` をコピーしているので、認証機能は**既に動く状態**です。
- [ ] `npx expo start` でアプリが起動する
- [ ] ログイン・ログアウトが動作する
- [ ] `.env.local` を新しいSupabaseプロジェクトのURLとKeyに更新する

#### Phase 2: 一覧画面（午後の目標）

Composerで画面を作っていきます:
- [ ] データ取得と一覧表示
- [ ] ローディング表示
- [ ] エラーハンドリング

#### Phase 3: 作成画面（Week 2で）

- [ ] フォーム実装
- [ ] Supabaseへの送信

#### Phase 4: 詳細・編集画面（Week 2で）

- [ ] 詳細表示
- [ ] 編集・削除機能

---

### よくあるコードパターン

> **このセクションは講師用リファレンスです。** 受講者はこのコードを直接書く必要はありません。ComposerでAIに指示を出して生成させてください。AIの出力が期待通りかの確認用です。

#### データ取得（一覧）

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TipsListScreen() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips();
  }, []);

  async function fetchTips() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('エラー: ' + error.message);
    } else {
      setTips(data);
    }
    setLoading(false);
  }

  if (loading) {
    return <Text>読み込み中...</Text>;
  }

  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TipItem tip={item} />
      )}
    />
  );
}
```

#### データ作成

```typescript
async function createTip(title: string, content: string, category: string) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('tips')
    .insert([
      {
        user_id: user.id,
        title,
        content,
        category,
      },
    ])
    .select()
    .single();

  if (error) {
    alert('エラー: ' + error.message);
  } else {
    alert('作成しました！');
    router.back();
  }
}
```

#### データ更新

```typescript
async function updateTip(id: string, title: string, content: string) {
  const { error } = await supabase
    .from('tips')
    .update({ title, content })
    .eq('id', id);

  if (error) {
    alert('エラー: ' + error.message);
  } else {
    alert('更新しました！');
  }
}
```

#### データ削除

```typescript
async function deleteTip(id: string) {
  const { error } = await supabase
    .from('tips')
    .delete()
    .eq('id', id);

  if (error) {
    alert('エラー: ' + error.message);
  } else {
    alert('削除しました！');
    router.back();
  }
}
```

---

## 15分ローテーション相談

### 講師の巡回スケジュール

| 時間 | 受講生 |
|------|--------|
| 13:00-13:15 | 受講生A |
| 13:15-13:30 | 受講生B |
| 13:30-13:45 | 受講生C |
| 13:45-14:00 | 受講生D |
| 14:00-14:15 | 受講生E |
| 14:15-14:30 | 休憩 |
| 14:30-14:45 | 受講生A |
| ... | ... |

### 相談時に聞くこと

1. **進捗確認**: どこまで進んだか
2. **ブロッカー**: 何に詰まっているか
3. **技術的質問**: 実装方法がわからない
4. **コードレビュー**: 書いたコードの確認

---

## トラブルシューティング

### Supabaseからデータが取得できない

1. **RLS確認**: ポリシーが正しく設定されているか
2. **認証確認**: ログインしているか（`auth.uid()` が存在するか）
3. **テーブル確認**: テーブルが存在し、データがあるか
4. **エラーログ**: `console.log(error)` でエラー内容を確認

### 画面遷移がうまくいかない

1. **ファイル名確認**: `app/` 配下のファイル名が正しいか
2. **router確認**: `useRouter()` を使っているか
3. **パラメータ確認**: `useLocalSearchParams()` でパラメータを受け取っているか

### TypeScriptエラー

1. **型定義**: Supabaseの型を定義する
2. **null check**: データが存在しない場合の処理
3. **オプショナル**: `?.` を使う

---

## 今日の目標

最低限達成すること:

- [ ] Supabaseテーブルが作成されている
- [ ] RLSが有効化されている
- [ ] 画面ワイヤーフレームが完成している
- [ ] GitHubリポジトリが作成されている
- [ ] ログイン画面が動作する
- [ ] 1つの画面（一覧 or 作成）が動作する

---

## チェックリスト（16時時点）

### データベース
- [ ] テーブルが作成されている
- [ ] RLSが有効化されている
- [ ] ポリシーが設定されている
- [ ] テストデータが入っている

### コード
- [ ] プロジェクトがビルドできる（`npx expo start`）
- [ ] ログインできる
- [ ] 最低1画面が動作する
- [ ] エラーハンドリングがある
- [ ] ローディング表示がある

### Git
- [ ] GitHubリポジトリが作成されている
- [ ] 初回コミットが完了している
- [ ] .env.localが.gitignoreに含まれている

---

## 明日（Day 8-10）の準備

### デイリーリズム（3日間共通）

| 時間 | 内容 |
|------|------|
| 9:00-9:15 | 朝会 |
| 9:15-12:00 | 実装 |
| 12:00-13:00 | 昼休み |
| 13:00-15:00 | 実装 |
| 15:00-15:30 | ペアレビュー |
| 15:30-16:00 | 夕会 |

### 朝会で話すこと

- 昨日の進捗
- 今日のゴール
- 困っていること

### ペアレビューの観点

- コードの可読性
- エラーハンドリング
- UI/UX
- バグがないか

---

## まとめ

今日学んだこと:

1. **Supabaseテーブル設計**: SQLでテーブル作成、RLS設定
2. **ワイヤーフレーム**: 紙とペンで画面設計
3. **プロジェクトセットアップ**: スタータープロジェクトから開始
4. **Cursor活用**: AIペアプログラミング
5. **実装の優先順位**: 認証 → 一覧 → 詳細 → 作成

明日から3日間: 個人開発（講師巡回サポート）
