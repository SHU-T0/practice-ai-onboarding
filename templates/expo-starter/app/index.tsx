import { View, Text, StyleSheet } from 'react-native'

/**
 * ホーム画面のコンポーネント
 *
 * このファイルが app/index.tsx なので、
 * アプリを起動すると最初に表示される画面です。
 *
 * ここから自分のアプリを作り始めましょう！
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* タイトル */}
      <Text style={styles.title}>Expo + Supabase スターター</Text>

      {/* 説明文 */}
      <Text style={styles.description}>
        このプロジェクトは、Expo と Supabase を使ったモバイルアプリの最小構成です。
      </Text>

      {/* 次のステップ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>次のステップ:</Text>
        <Text style={styles.listItem}>1. 要件定義を完成させる</Text>
        <Text style={styles.listItem}>2. ペルソナを作る</Text>
        <Text style={styles.listItem}>3. 新しい画面を追加する</Text>
        <Text style={styles.listItem}>4. Supabaseのテーブルを作る</Text>
        <Text style={styles.listItem}>5. データを表示する</Text>
      </View>
    </View>
  )
}

/**
 * スタイル定義
 *
 * StyleSheet.createを使うことで、型安全なスタイルを定義できます。
 * React NativeのスタイルはCSSに似ていますが、少し違います:
 * - background-color → backgroundColor
 * - font-size → fontSize
 * - 単位は数値のみ（pxは不要）
 */
const styles = StyleSheet.create({
  // 画面全体のコンテナ
  container: {
    flex: 1, // 画面全体を使う
    backgroundColor: '#f5f5f5', // 背景色（薄いグレー）
    padding: 20, // 内側の余白
    justifyContent: 'center', // 縦方向の中央揃え
  },

  // タイトルのスタイル
  title: {
    fontSize: 24, // フォントサイズ
    fontWeight: 'bold', // 太字
    color: '#333', // テキスト色（濃いグレー）
    marginBottom: 10, // 下の余白
    textAlign: 'center', // 中央揃え
  },

  // 説明文のスタイル
  description: {
    fontSize: 16,
    color: '#666', // テキスト色（中間のグレー）
    textAlign: 'center',
    marginBottom: 30, // 下の余白
    lineHeight: 24, // 行の高さ
  },

  // セクションのコンテナ
  section: {
    backgroundColor: '#fff', // 背景色（白）
    padding: 20, // 内側の余白
    borderRadius: 10, // 角を丸くする
    shadowColor: '#000', // 影の色
    shadowOffset: { width: 0, height: 2 }, // 影の位置
    shadowOpacity: 0.1, // 影の透明度
    shadowRadius: 4, // 影のぼかし
    elevation: 3, // Android用の影
  },

  // セクションタイトルのスタイル
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  // リスト項目のスタイル
  listItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10, // 左の余白（インデント）
  },
})
