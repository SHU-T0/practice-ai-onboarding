import { Stack } from 'expo-router'

/**
 * アプリ全体のレイアウトを設定するコンポーネント
 *
 * Expo Routerの<Stack>を使って、画面遷移を管理します。
 * 画面を追加するときは、app/フォルダに新しいファイルを作成するだけで、
 * 自動的にルートとして認識されます。
 *
 * 例:
 * - app/index.tsx → / (ホーム画面)
 * - app/settings.tsx → /settings (設定画面)
 * - app/profile.tsx → /profile (プロフィール画面)
 */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // ヘッダーのスタイル設定
        headerStyle: {
          backgroundColor: '#007AFF', // ヘッダーの背景色（iOSのブルー）
        },
        headerTintColor: '#fff', // ヘッダーのテキスト色（白）
        headerTitleStyle: {
          fontWeight: 'bold', // ヘッダーのタイトルを太字に
        },
      }}
    >
      {/* ホーム画面の設定 */}
      <Stack.Screen
        name="index"
        options={{
          title: 'ホーム', // ヘッダーに表示されるタイトル
        }}
      />
    </Stack>
  )
}
