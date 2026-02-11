import { createClient } from '@supabase/supabase-js'

// .env.local から環境変数を読み込む
// EXPO_PUBLIC_ で始まる環境変数は、アプリ内で使用できます
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

// Supabaseクライアントを作成
// このクライアントを使って、データベースにアクセスします
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
