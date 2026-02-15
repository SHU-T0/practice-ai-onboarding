---
title: "AI使い分けガイド"
category: "reference"
---

# AI使い分けガイド(2026年2月版)

## 主要AIモデル一覧

### 汎用LLM(チャット型)

| モデル | 提供元 | 特徴 | 得意なこと | 料金 |
|--------|--------|------|-----------|------|
| Claude Opus 4.6 | Anthropic | 最高の推論力、extended thinking | 複雑な分析、長文理解、設計判断 | Pro $20/月 |
| Claude Sonnet 4.5 | Anthropic | コーディング最強、高速 | コード生成、バグ修正、日常業務 | Pro $20/月 |
| GPT-5.2 | OpenAI | 汎用最新、バランス良い | 幅広い質問、画像理解 | Plus $20/月 |
| o5.3 Codex | OpenAI | コーディング特化、深い推論 | 複雑なコード生成・デバッグ | Pro $200/月 |
| Gemini 3 Pro | Google | Google連携、マルチモーダル | 検索連携、画像・動画理解 | 無料版あり |
| Gemini 3 Flash | Google | 高速・低コスト | 素早い回答、軽いタスク | 無料 |
| Gemini Nano Banana | Google | 端末上動作 | オフライン、プライバシー重視 | 無料(端末内蔵) |

### Thinkingモデル(考えるAI)

通常のAIが「直感で即答」するのに対し、Thinkingモデルは「段階的に考えてから回答」する。

| モデル | 特徴 | 使い所 |
|--------|------|--------|
| Claude Opus 4.6 (extended thinking) | 段階的推論を可視化 | 複雑な設計判断、バグの根本原因調査 |
| OpenAI o5.3 | reasoning tokenで深く思考 | 難しいコーディング問題、数学的問題 |

### 特化型モデル

| カテゴリ | 代表的なモデル/ツール | 用途 |
|---------|---------------------|------|
| 画像生成 | DALL-E 3 (ChatGPT内蔵), Midjourney, Stable Diffusion | ロゴ、イラスト、デザインモック |
| 動画生成 | Sora (OpenAI), Runway Gen-3 | プロモ動画、デモ映像 |
| 音声合成 (TTS) | ElevenLabs, OpenAI TTS | ナレーション、音声ガイド |
| 音声認識 (STT) | Whisper (OpenAI) | 議事録作成、文字起こし |
| 音楽生成 | Suno, Udio | BGM、ジングル |

### Local LLM(手元で動くAI)

Ollama や LM Studio を使えば、自分のPCでAIを動かせる。

**メリット**: データが外部に出ない / オフラインOK / APIコスト不要
**デメリット**: クラウドモデルより性能が劣る / 高性能GPU推奨
**使い所**: 機密データの処理、ネット環境がない場合、個人実験
**注意**: 業務利用時はモデルのライセンス確認が必要

## コーディングAIツール

| ツール | 特徴 | 使い方 |
|--------|------|--------|
| **Cursor** | AIエディタ、Tab補完・Composer | ← この研修のメインツール |
| **Claude Code** | ターミナルベースのAI開発 | ターミナル操作が好きな人向け(オプション) |
| **Codex CLI** | OpenAIのターミナルAI | ターミナル操作が好きな人向け(オプション) |
| **v0** | Web UI生成特化 | Webページやダッシュボードの作成 |
| **GitHub Copilot** | エディタ内AI補完 | VS Code等での補完 |

## 使い分けフローチャート

- アプリのコードを書きたい → **Cursor**(メイン)
- 企画・分析・壁打ちしたい → **Claude Web版** or **ChatGPT**
- 最新情報を調べたい → **Gemini** or **Perplexity**
- Webサイトを作りたい → **v0**
- 画像を生成したい → **ChatGPT(DALL-E 3)** or **Midjourney**
- 議事録を文字起こししたい → **Whisper**
- 機密データを処理したい → **Local LLM(Ollama等)**

## AIへの質問の基本ルール

- 具体的に指示する
- 役割を与える(「あなたはUXデザイナーです」)
- 出力形式を指定する(「表形式で」「箇条書きで」)
- 段階的に質問する(一度に全部聞かない)
- Thinkingモデルには「考える時間」を与える(複雑な質問向き)

## この研修での推奨ツール

| 用途 | 推奨ツール | 備考 |
|------|-----------|------|
| コーディング | Cursor (Claude Sonnet 4.5) | メインの開発環境 |
| 企画・要件定義 | Claude Pro Web版 | Opus 4.6で深い分析 |
| ちょっとした調べ物 | ChatGPT / Gemini | 無料版でもOK |
| ファクトチェック | Perplexity | 出典付きで信頼性高い |
