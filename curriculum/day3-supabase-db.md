# Day 3: バックエンド入門

## ゴール

Supabase（DB）に接続し、データを保存・読み出しできるアプリを作る

> **テンプレートについて**: Day 2-3では学習のシンプルさを優先して `npx create-expo-app --template blank-typescript`（App.tsxベース）を使用します。Day 4以降でExpo Router構成（`app/index.tsx`ベース）に移行します。スタータープロジェクト（`templates/expo-starter/`）はDay 4以降で使用してください。

## 新概念（2つに絞る）

1. **DB（データベース）**: サーバーに保存されるデータ
2. **API接続**: アプリとサーバーの会話

※Authは明日

## タイムテーブル

| 時間 | 内容 | 形式 | 所要 |
|------|------|------|------|
| 9:00-9:15 | 朝の復習 | 個人 | 15分 |
| 9:15-9:45 | ミニ座学: サーバーとDBをGoogle Sheetsに例えて | 全体 | 30分 |
| 9:45-10:45 | Supabaseプロジェクト作成→テーブル作成→データ手動追加 | 全体→個人 | 60分 |
| 10:45-11:00 | 休憩 | - | 15分 |
| 11:00-12:00 | Expoアプリからデータ読み出し（SELECT）→リスト表示 | 全体→個人 | 60分 |
| 12:00-13:00 | 昼休み | - | 60分 |
| 13:00-14:00 | データの追加（INSERT）・削除（DELETE）を実装 | 全体→個人 | 60分 |
| 14:00-14:15 | 休憩 | - | 15分 |
| 14:15-15:00 | 「壊してみて」課題: 意図的にエラーを起こす→AIで解決 | ペア | 45分 |
| 15:00-15:30 | デバッグ実践: console.logでデータの中身を確認 | 全体→個人 | 30分 |
| 15:30-16:00 | 成果発表 + 振り返り | 全体 | 30分 |

## セッション詳細

### 9:00-9:15 朝の復習

#### 講師向けメモ

- state（状態）の復習
- ToDoアプリを思い出させる
- 今日の内容への布石

#### 受講者配布用手順

**復習課題**

以下の質問に答えてみましょう（口頭でOK）:

1. stateとは何ですか?
2. ボタンを押した時、なぜ画面が更新されますか?
3. ToDoリストのstateは何のデータ型でしたか?

**今日の目標**

昨日はstateを使って、アプリの中だけでデータを管理しました。

```
アプリを閉じる → データが消える
```

今日はSupabaseを使って、サーバーにデータを保存します。

```
アプリを閉じる → データはサーバーに残る
別のスマホから → 同じデータが見える
```

#### 完了チェックポイント

- [ ] stateの復習ができた
- [ ] 今日学ぶことのイメージが湧いた

---

### 9:15-9:45 ミニ座学: サーバーとDB

#### 講師向けメモ

- 技術用語を避ける
- Google Sheets / Excelの例えが効果的
- なぜサーバーが必要かを強調

#### 受講者配布用資料

**サーバーとDBをGoogle Sheetsに例えると**

```
┌─────────────────────────────────────────┐
│        あなたのスマホ（Expoアプリ）         │
│  ┌────────────────┐                     │
│  │  画面に表示     │                     │
│  │  - ToDoリスト  │                     │
│  └────────────────┘                     │
└─────────────────────────────────────────┘
              ↕ インターネット
┌─────────────────────────────────────────┐
│        サーバー（Supabase）               │
│  ┌────────────────────────────┐         │
│  │  データベース（DB）         │         │
│  │  = Google Sheetsのイメージ  │         │
│  │                            │         │
│  │  todos テーブル             │         │
│  │  ┌──┬────────┬────┐       │         │
│  │  │id│ title  │done│       │         │
│  │  ├──┼────────┼────┤       │         │
│  │  │1 │買い物   │false│      │         │
│  │  │2 │メール   │true │      │         │
│  │  └──┴────────┴────┘       │         │
│  └────────────────────────────┘         │
└─────────────────────────────────────────┘
```

**なぜサーバーが必要か?**

| アプリだけ（昨日まで） | サーバー有り（今日から） |
|---------------------|---------------------|
| アプリを閉じるとデータが消える | データが永続化される |
| 1台のスマホだけ | 複数のスマホで共有 |
| 他の人は見られない | 他のユーザーと共有可能 |

**Supabaseとは**

- バックエンドサービス（Firebase的なもの）
- データベース、認証、ストレージ等を提供
- 無料プランがある
- React Nativeとの相性が良い

**用語の整理**

| 用語 | 説明 | Google Sheetsで例えると |
|------|------|----------------------|
| **Database（DB）** | データを保存する場所 | Excelファイル全体 |
| **Table（テーブル）** | データの表 | シート1枚 |
| **Row（行）** | 1件のデータ | 1行のデータ |
| **Column（列）** | データの項目 | 列（名前、メール等） |
| **API** | アプリとサーバーの会話 | Excelファイルを開く操作 |

**SQL操作（覚えなくてOK）**

| 操作 | SQL | Supabaseのコード |
|------|-----|----------------|
| 読む | SELECT | `.select()` |
| 追加 | INSERT | `.insert()` |
| 更新 | UPDATE | `.update()` |
| 削除 | DELETE | `.delete()` |

AIがこの形で書いてくれるので、覚える必要はありません。

#### 完了チェックポイント

- [ ] サーバーとDBの役割を理解した
- [ ] Google Sheetsの例えで説明できる
- [ ] Supabaseが何かを理解した

---

### 9:45-10:45 Supabaseプロジェクト作成→テーブル作成

#### 講師向けメモ

- **最初の30分**: 講師が画面共有でデモ
- **次の30分**: 受講者が同じ操作
- 設定ミスが多発しやすいので丁寧に

#### 受講者配布用手順

**ステップ1: Supabaseプロジェクト作成**

1. https://supabase.com にアクセス
2. サインイン（Week 0で作成したアカウント）
3. 「New Project」をクリック

**プロジェクト設定**:

- **Name**: `my-todo-app`
- **Database Password**: 強力なパスワードを生成（メモしておく）
- **Region**: `Northeast Asia (Tokyo)`
- **Pricing Plan**: `Free`

4. 「Create new project」をクリック
5. プロジェクト作成完了を待つ（1-2分）

**ステップ2: テーブル作成（GUIで）**

1. 左メニューから「Table Editor」（テーブルのアイコン）をクリック
2. 「Create a new table」をクリック

**テーブル設定**:

- **Name**: `todos`
- **Description**: `My todo list`
- 「Enable Row Level Security (RLS)」のチェックを**外す**（今日は認証なし）

> **なぜRLSを外すのか**: RLSは「誰がどのデータにアクセスできるか」を制御する仕組みです。今日はまだログイン機能がないため、一時的に無効にします。Day 5でログイン機能と一緒に有効化します。

**Columns（列）**:

デフォルトで `id` と `created_at` があります。以下を追加:

| Name | Type | Default Value | Primary | Nullable |
|------|------|---------------|---------|----------|
| title | text | - | - | ✗（チェック外す） |
| completed | bool | false | - | ✓（チェック付ける） |

3. 「Save」をクリック

**ステップ3: データを手動追加**

1. 「Insert row」をクリック
2. 以下のデータを追加:

| title | completed |
|-------|-----------|
| 買い物に行く | false |
| メールを返信する | false |
| 資料を作成する | true |

3. 各データを「Save」

**ステップ4: データを確認**

テーブル画面に3件のToDoが表示されていればOK。

**ステップ5: API情報を取得**

1. 左メニューから「Project Settings」（左下の歯車アイコン）→「API」をクリック
2. 以下をメモ:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJxxx...` (長い文字列)

この2つは後で使います。

#### トラブルシューティング

**プロジェクトが作成できない**

→ メールアドレスの確認が必要な場合があります。受信トレイをチェック。

**テーブルが作成できない**

→ プロジェクトの作成が完了していない可能性。ダッシュボードで確認。

**データが追加できない**

→ 必須項目（Nullable=✗）が空になっていないか確認。

#### 完了チェックポイント

- [ ] Supabaseプロジェクトを作成した
- [ ] `todos` テーブルを作成した
- [ ] 3件のテストデータを手動で追加した
- [ ] API情報（URL、Key）をメモした

---

### 11:00-12:00 Expoアプリからデータ読み出し（SELECT）

#### 講師向けメモ

- **最初の30分**: 講師がデモ
- **次の30分**: 受講者が実装
- 初めてのAPI接続。エラーが出やすいので注意

#### 受講者配布用手順

**ステップ1: プロジェクト作成**

```bash
cd ~/Documents
npx create-expo-app@latest supabase-todo --template blank-typescript
cd supabase-todo
```

**ステップ2: Supabaseクライアントのインストール**

```bash
npm install @supabase/supabase-js
```

> **npm install と npx の違い**: `npm install` は「道具を自分のプロジェクトに追加する」コマンド。`npx` は「道具を一時的に借りて使う」コマンド。どちらもターミナルで実行します。覚える必要はなく、手順通りにコピペすればOKです。

**ステップ3: 環境変数の設定**

1. Cursorの左側にファイル一覧が表示されています
2. ファイル一覧の空白部分で**右クリック** → **New File** をクリック
3. ファイル名に `.env.local` と入力してEnter
4. 作成されたファイルに以下を記入:

```
EXPO_PUBLIC_SUPABASE_URL=ここにステップ5でメモしたProject URLを貼り付け
EXPO_PUBLIC_SUPABASE_ANON_KEY=ここにステップ5でメモしたanon public keyを貼り付け
```

**具体例**（値は各自異なります）:
```
EXPO_PUBLIC_SUPABASE_URL=https://abcdefghij.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

> **注意**: `=` の前後にスペースを入れないでください。URLとKeyは各自異なります。

**ステップ4: Cursorで開く**

Cursorアプリを起動し、`File` → `Open Folder` → `Documents` → `supabase-todo` を選択して「Open」をクリックします。

**ステップ5: Supabase設定ファイルを作成**

Composerで以下を指示:

```
以下のファイルを作成してください:

ファイル名: lib/supabase.ts

内容:
- Supabaseクライアントを初期化
- .env.localからURL、KEYを読み込む
- exportしてアプリ全体で使えるようにする

@supabase/supabase-jsを使用してください。
```

**ステップ6: ToDoリストを取得して表示**

Composerで以下を指示:

```
App.tsxを編集して、Supabaseからtodosを取得して表示するアプリを作ってください。

要件:
1. アプリ起動時に、Supabaseの`todos`テーブルからデータを取得
2. ToDoをリスト表示（title, completedを表示）
3. completedがtrueの場合は取り消し線
4. ローディング中は「読み込み中...」と表示
5. エラーが出た場合はエラーメッセージを表示

lib/supabase.tsからsupabaseをimportしてください。
useEffectとuseStateを使ってください。
```

**ステップ7: シミュレータで確認**

```bash
npx expo start
```

Supabaseに追加した3件のToDoが表示されればOK!

**ステップ8: console.logで確認**

App.tsxを開いて、データ取得部分を確認:

```typescript
useEffect(() => {
  fetchTodos();
}, []);

const fetchTodos = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*');

  console.log('取得したデータ:', data);
  console.log('エラー:', error);

  if (data) setTodos(data);
};
```

ターミナル（`npx expo start` を実行した画面）に「取得したデータ: [...]」と表示されていることを確認。

#### トラブルシューティング

**データが取得できない（空配列）**

→ Chatに質問:
```
Supabaseからデータを取得できません。
console.logでは以下のように表示されます:

取得したデータ: []
エラー: null

考えられる原因は何ですか?
```

→ 確認ポイント:
- .env.localファイルが正しいか
- Supabaseのテーブルにデータがあるか
- テーブル名が`todos`で合っているか

**エラーが出る**

→ エラーメッセージをChatに貼り付け

**環境変数が読み込めない**

→ Expoを再起動:
```bash
# Ctrl+C で停止
npx expo start --clear
```

#### 完了チェックポイント

- [ ] Supabaseクライアントを設定した
- [ ] .env.localファイルを作成した
- [ ] Supabaseからデータを取得できた
- [ ] 3件のToDoがアプリに表示された
- [ ] console.logでデータを確認した

---

### 13:00-14:00 データの追加（INSERT）・削除（DELETE）

#### 講師向けメモ

- CRUD操作の基本を体験
- **最初の30分**: 講師がデモ（追加機能）
- **次の30分**: 受講者が実装（追加+削除）

#### 受講者配布用手順

**課題: ToDoの追加と削除を実装**

**ステップ1: 追加機能の実装**

Composerで以下を指示:

```
現在のアプリに、ToDo追加機能を実装してください。

要件:
1. 上部にテキスト入力欄と「追加」ボタンを配置
2. 入力欄にタイトルを入力して「追加」を押すと、Supabaseに保存
3. 保存後、自動でリストを再取得して更新
4. 入力欄をクリア

Supabaseへの保存には`.insert()`を使用してください。
```

**ステップ2: 動作確認**

1. アプリで新しいToDoを追加
2. Supabaseのダッシュボードでテーブルを確認
3. 新しいToDoが追加されていればOK!

**ステップ3: 削除機能の実装**

Composerで以下を指示:

```
各ToDoに「削除」ボタンを追加してください。

要件:
1. 各ToDoの右側に「削除」ボタンを配置
2. ボタンを押すと、SupabaseからそのToDoを削除
3. 削除後、自動でリストを再取得して更新

Supabaseからの削除には`.delete().eq('id', todoId)`を使用してください。
```

**ステップ4: 動作確認**

1. アプリで削除ボタンを押す
2. Supabaseのダッシュボードで確認
3. データが削除されていればOK!

**ステップ5: コードの確認**

App.tsxを開いて、追加・削除の処理を確認:

```typescript
// 追加
const addTodo = async () => {
  const { error } = await supabase
    .from('todos')
    .insert({ title: newTodo, completed: false });

  if (!error) {
    fetchTodos(); // 再取得
  }
};

// 削除
const deleteTodo = async (id: string) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (!error) {
    fetchTodos(); // 再取得
  }
};
```

#### 発展課題（早く終わった人向け）

**完了トグル機能の実装**

Composerで以下を指示:

```
ToDoをタップすると、completedを切り替える機能を追加してください。

要件:
1. ToDoをタップすると、completedをtrue/falseで切り替え
2. Supabaseのデータも更新
3. 画面を自動で更新

Supabaseの更新には`.update().eq('id', todoId)`を使用してください。
```

#### トラブルシューティング

**追加できない**

→ console.logでエラーを確認:
```typescript
const { data, error } = await supabase
  .from('todos')
  .insert({ title: newTodo, completed: false });

console.log('追加エラー:', error);
```

**削除できない**

→ IDが正しく渡されているか確認:
```typescript
console.log('削除するID:', id);
```

#### 完了チェックポイント

- [ ] ToDoを追加できた（アプリ→Supabase）
- [ ] ToDoを削除できた（Supabase→アプリ）
- [ ] Supabaseダッシュボードでデータを確認した
- [ ] （発展）完了トグルを実装できた

---

### 14:15-15:00 「壊してみて」課題

#### 講師向けメモ

- エラーを恐れない文化を作る
- ペアワークで実施（教え合い）
- AIでの解決を体験させる

#### 受講者配布用手順

**課題: 意図的にエラーを起こして、AIで解決する**

以下のエラーを1つずつ起こして、AIに解決してもらいましょう。

**エラー1: テーブル名を間違える**

1. App.tsxで、`.from('todos')` を `.from('todo')` に変更
2. シミュレータで確認→エラーが出る
3. エラーメッセージをコピー
4. Chatに貼り付けて「このエラーを解決してください」
5. AIの指示に従って修正

**エラー2: 環境変数を削除する**

1. `.env.local` ファイルの `EXPO_PUBLIC_SUPABASE_URL` を削除
2. Expoを再起動: `npx expo start --clear`
3. エラーが出る
4. Chatに質問して解決

**エラー3: カラム名を間違える**

1. `.select('*')` を `.select('name')` に変更（存在しないカラム）
2. エラーが出る
3. Chatで解決

**エラー4: データ型を間違える**

1. `.insert({ title: 123, completed: false })` に変更（titleが数字）
2. エラーが出る
3. Chatで解決

**ペアでディスカッション**

- どんなエラーメッセージが出たか
- AIはどう解決を提案したか
- エラーから何を学んだか

#### 完了チェックポイント

- [ ] 4つのエラーを全て起こした
- [ ] 全てAIで解決できた
- [ ] エラーメッセージの読み方が分かった
- [ ] ペアで学び合った

---

### 15:00-15:30 デバッグ実践: console.log

#### 講師向けメモ

- デバッグの基本を習得
- console.logの使い方を実践
- 「データの中身を見る」習慣をつける

#### 受講者配布用手順

**課題: console.logでデータの流れを追う**

**ステップ1: データ取得時にログ**

App.tsxの `fetchTodos` 関数に、console.logを追加:

```typescript
const fetchTodos = async () => {
  console.log('--- データ取得開始 ---');

  const { data, error } = await supabase
    .from('todos')
    .select('*');

  console.log('取得したデータ:', data);
  console.log('エラー:', error);
  console.log('データ件数:', data?.length);

  if (data) setTodos(data);

  console.log('--- データ取得完了 ---');
};
```

**ステップ2: 追加時にログ**

```typescript
const addTodo = async () => {
  console.log('--- ToDo追加開始 ---');
  console.log('追加するタイトル:', newTodo);

  const { data, error } = await supabase
    .from('todos')
    .insert({ title: newTodo, completed: false })
    .select();

  console.log('追加結果:', data);
  console.log('エラー:', error);

  if (!error) {
    fetchTodos();
  }

  console.log('--- ToDo追加完了 ---');
};
```

**ステップ3: ログを確認しながら操作**

1. アプリを起動→ターミナル（`npx expo start` を実行した画面）のログを確認
2. ToDoを追加→ターミナルのログを確認
3. ToDoを削除→ターミナルのログを確認

**ステップ4: ログの読み方を理解**

ターミナル（`npx expo start` を実行した画面）に以下のように表示されます:

```
--- データ取得開始 ---
取得したデータ: [{id: "1", title: "買い物に行く", ...}, ...]
エラー: null
データ件数: 3
--- データ取得完了 ---
```

これで「今、何が起きているか」が分かります。

**練習課題**

以下の場所にconsole.logを追加してください:

1. 削除ボタンを押した時
2. stateが更新された時
3. エラーが発生した時

**プロンプト例（Chatで）**:

```
deleteTodo関数に、以下の情報をconsole.logで出力してください:
1. 削除開始のメッセージ
2. 削除するToDoのID
3. 削除結果
4. エラーの有無
5. 削除完了のメッセージ
```

#### デバッグのベストプラクティス

1. **処理の開始・終了をログ**
   ```typescript
   console.log('--- 処理開始 ---');
   // 処理
   console.log('--- 処理完了 ---');
   ```

2. **変数の中身をログ**
   ```typescript
   console.log('変数名:', 変数);
   ```

3. **エラーは必ずログ**
   ```typescript
   if (error) {
     console.error('エラー発生:', error);
   }
   ```

4. **配列の長さをログ**
   ```typescript
   console.log('配列の長さ:', array.length);
   ```

#### 完了チェックポイント

- [ ] console.logを追加できた
- [ ] ターミナルでログを確認できた
- [ ] データの流れを理解できた
- [ ] デバッグの習慣がついた

---

### 15:30-16:00 成果発表 + 振り返り

#### 講師向けメモ

- Supabase連携の達成を称賛
- データが永続化されることを確認
- Day 4（認証）への期待を高める

#### 発表フォーマット

各受講者が発表（5分/人）:

1. **作ったアプリのデモ**（2分）
   - ToDoの追加・削除を実演
   - Supabaseダッシュボードも見せる

2. **学んだこと**（2分）
   - Supabaseとは何か
   - API接続の仕組み
   - CRUD操作

3. **苦労した点・解決方法**（1分）
   - どんなエラーが出たか
   - console.logでどうデバッグしたか

#### Slack振り返り投稿

```
【Day 3 振り返り】

## 今日学んだこと
- Supabaseの基本
- データベースのCRUD操作（作成・読み取り・更新・削除）
- API接続の仕組み
- console.logでのデバッグ

## 作ったもの
- Supabase連携ToDoアプリ
[スクリーンショットを添付]

## Supabaseで実装した機能
- データ取得（SELECT）
- データ追加（INSERT）
- データ削除（DELETE）
- （完了トグル）

## 苦労した点・解決方法
-

## 明日への意気込み
明日は認証（ログイン機能）に挑戦!
```

#### 完了チェックポイント

- [ ] 全員が発表した
- [ ] Supabaseの理解が深まった
- [ ] データ永続化を体感できた
- [ ] Slackに投稿した

---

## 講師向け: Day 3の成功基準

### 最重要: 全員がこれを達成していること

- [ ] Supabaseプロジェクトを作成できた
- [ ] テーブルを作成し、データを手動追加できた
- [ ] ExpoアプリからSupabaseに接続できた
- [ ] CRUD操作（少なくとも読み取り・追加・削除）を実装できた
- [ ] console.logでデバッグできた

### 理解度の確認質問

1. 「Supabaseとは何ですか?」
   → 「バックエンドサービス。DBや認証を提供」

2. 「なぜサーバーにデータを保存するのですか?」
   → 「アプリを閉じてもデータが残る。複数のデバイスで共有できる」

3. 「`.from('todos').select('*')` は何をしていますか?」
   → 「todosテーブルから全てのデータを取得」

### よくあるトラブルと解決策

| トラブル | 原因 | 解決策 |
|---------|------|--------|
| データが取得できない | RLSが有効 | テーブル設定でRLSを無効化 |
| 環境変数が読めない | .envの書き方が間違い | `EXPO_PUBLIC_` プレフィックスを確認 |
| 追加できない | カラム名の間違い | Supabaseダッシュボードで確認 |
| エラーが出ても詳細不明 | console.logがない | error をログ出力 |

### Day 4への準備

- [ ] 全員がSupabase連携アプリを完成させた
- [ ] CRUD操作を理解した
- [ ] 認証の概念を予告（明日はログイン機能）

---

## 補足資料

### Supabaseのよくある質問

**Q: 無料プランの制限は?**

A:
- DB容量: 500MB
- API呼び出し: 50,000回/月
- 同時接続: 500

個人開発・プロトタイプなら十分です。

**Q: RLSとは何ですか?**

A: Row Level Security（行レベルセキュリティ）。ユーザーごとにデータのアクセス権限を制御します。今日は認証がないので無効化しましたが、明日は有効化します。

**Q: SQL文を書く必要がありますか?**

A: いいえ。Supabaseのライブラリが自動でSQL文を生成してくれます。

### Supabase JavaScript Clientの主なメソッド

```typescript
// 全件取得
const { data } = await supabase.from('todos').select('*');

// 条件付き取得
const { data } = await supabase.from('todos').select('*').eq('completed', false);

// 追加
const { data } = await supabase.from('todos').insert({ title: 'New Todo' });

// 更新
const { data } = await supabase.from('todos').update({ completed: true }).eq('id', '1');

// 削除
const { data } = await supabase.from('todos').delete().eq('id', '1');
```

AIがこれを書いてくれるので、覚える必要はありません。

### 次のステップ

明日（Day 4）はSupabase Authを使って、ログイン機能を実装します。
これで「誰のToDoか」を区別できるようになります。

### Day 4で変わること（予告）

明日からは**プロジェクトの作り方が変わります**。

今日まで使っていた `App.tsx` 1ファイルの構成から、**Expo Router**（複数画面を管理できる仕組み）に移行します。

```
今日まで（Day 2-3）:
  プロジェクト/
  └── App.tsx          ← 全部ここに書く（1画面）

明日から（Day 4以降）:
  プロジェクト/
  ├── app/
  │   ├── _layout.tsx  ← 画面の枠組み（ナビゲーション）
  │   ├── index.tsx    ← メイン画面
  │   └── login.tsx    ← ログイン画面
  └── lib/
      └── supabase.ts  ← Supabase設定
```

**なぜ変わるのか**: ログイン画面とメイン画面の2つの画面が必要になるため、複数画面を管理できるExpo Routerを使います。ファイル名がそのまま画面のURLになる便利な仕組みです。

> 心配しなくてOK！明日のカリキュラムで手順を丁寧に説明します。

お疲れさまでした!

---

## 講師用チェックリスト

### Day 3開始前

- [ ] スライド資料（サーバーとDB、CRUD操作）
- [ ] Supabaseテストプロジェクトの確認
- [ ] 全受講者のSupabaseアカウント確認
- [ ] トラブルシューティングガイド更新

### 各セッション

- [ ] 9:45 Supabase画面共有の準備
- [ ] 11:00 Expo連携デモの準備
- [ ] 13:00 CRUD操作デモの準備
- [ ] タイマー管理
- [ ] 受講者の進捗確認（特にAPI接続）

### Day 3終了時

- [ ] 全員のSlack投稿確認
- [ ] 全員がSupabase接続成功したか確認
- [ ] 遅れている人のフォローアップ
- [ ] Day 4の準備（認証フローの確認）

明日は認証です。いよいよ本格的なアプリになります!
