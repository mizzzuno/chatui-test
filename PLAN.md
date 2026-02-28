# Slack風チャットUI + Copilotパネル 実装プラン

## 概要

Tailwind CSS + shadcn/ui をベースに、React Bits のビジュアルエフェクトをアクセントとして組み合わせた4カラムレイアウトのチャットUIを構築する。状態管理は React Context + useReducer で行い、Copilot機能はUIモック（ダミーレスポンス）として実装する。バックエンドは不要で、すべてフロントエンドのモックデータで動作する。

## 技術スタック

| カテゴリ             | 選定技術                     |
| -------------------- | ---------------------------- |
| フレームワーク       | React 19 + TypeScript        |
| ビルドツール         | Vite 7                       |
| スタイリング         | Tailwind CSS v4              |
| UIライブラリ         | shadcn/ui                    |
| ビジュアルエフェクト | React Bits                   |
| 状態管理             | React Context + useReducer   |
| Copilot AI           | UIモック（ダミーレスポンス） |

---

## レイアウト構成

```
┌──────────┬──────────────────────┬─────────────┬─────────────┐
│ Sidebar  │    Main Chat Area    │   Thread    │   Copilot   │
│ (256px)  │    (flex-1)          │   (360px)   │   (360px)   │
│          │                      │             │             │
│ ルーム    │  メッセージ一覧       │ スレッド     │ AI質問/回答  │
│ リスト    │  + 入力欄            │ メッセージ   │ パネル       │
│          │                      │ + 入力欄    │             │
└──────────┴──────────────────────┴─────────────┴─────────────┘
```

- Thread パネルと Copilot パネルは**開閉トグル可能**
- 閉じた状態では Main Chat Area が広がる

---

## ディレクトリ構造

```
src/
  components/
    layout/
      AppLayout.tsx          ← 4カラムレイアウトのルートコンポーネント
    sidebar/
      Sidebar.tsx            ← 左サイドバー全体
      RoomList.tsx           ← ルーム一覧
      RoomItem.tsx           ← 個別ルーム行
    chat/
      ChatPanel.tsx          ← メインチャットエリア全体
      ChatHeader.tsx         ← チャットヘッダー（ルーム名、スレッド/Copilot開閉ボタン）
      MessageList.tsx        ← メッセージ一覧（スクロール）
      MessageItem.tsx        ← 個別メッセージ（アバター、名前、時刻、本文）
      MessageInput.tsx       ← メッセージ入力エリア（テキストエリア + 送信ボタン）
    thread/
      ThreadPanel.tsx        ← スレッドパネル全体
      ThreadHeader.tsx       ← スレッドヘッダー（閉じるボタン）
      ThreadMessageList.tsx  ← スレッド内メッセージ一覧
      ThreadInput.tsx        ← スレッド返信入力
    copilot/
      CopilotPanel.tsx       ← Copilotパネル全体
      CopilotHeader.tsx      ← Copilotヘッダー（閉じるボタン）
      CopilotMessages.tsx    ← AI会話履歴表示
      CopilotInput.tsx       ← AI質問入力
  context/
    ChatContext.tsx           ← チャット全体の状態管理（Context + Reducer）
  types/
    index.ts                 ← 型定義（Room, Message, Thread, CopilotMessage）
  data/
    mockData.ts              ← モックデータ（ルーム、メッセージ、ユーザー）
  hooks/
    useChatContext.ts        ← Context用カスタムフック
```

---

## 実装ステップ

### Step 1: プロジェクト初期設定

- Tailwind CSS v4 をインストール・設定
  - `@tailwindcss/vite` プラグイン追加
  - `src/index.css` に `@import "tailwindcss"` 追記
- shadcn/ui を初期化（`npx shadcn@latest init`）→ `components.json` 生成
- React Bits の必要コンポーネントを個別にCLI or コピーで追加
  - 初期は背景エフェクト1つ + テキストアニメーション1つ程度
- `vite.config.ts` にパスエイリアス `@/` → `src/` を追加

---

### Step 2: 型定義（`src/types/index.ts`）

以下の型を定義:

```typescript
// ユーザー
type User = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
};

// メッセージ
type Message = {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  threadId?: string;
  reactions?: { emoji: string; userIds: string[] }[];
};

// スレッド
type Thread = {
  id: string;
  parentMessageId: string;
  messages: Message[];
  participantIds: string[];
};

// チャットルーム
type Room = {
  id: string;
  name: string;
  icon?: string;
  type: "channel" | "dm";
  unreadCount: number;
};

// Copilotメッセージ
type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

// チャット全体の状態
type ChatState = {
  rooms: Room[];
  activeRoomId: string;
  messages: Record<string, Message[]>;
  activeThread: Thread | null;
  isThreadOpen: boolean;
  isCopilotOpen: boolean;
  copilotMessages: CopilotMessage[];
};

// アクション（discriminated union）
type ChatAction =
  | { type: "SELECT_ROOM"; payload: string }
  | { type: "SEND_MESSAGE"; payload: Message }
  | { type: "OPEN_THREAD"; payload: Thread }
  | { type: "CLOSE_THREAD" }
  | { type: "SEND_THREAD_MESSAGE"; payload: Message }
  | { type: "TOGGLE_COPILOT" }
  | { type: "CLOSE_COPILOT" }
  | { type: "SEND_COPILOT_MESSAGE"; payload: CopilotMessage }
  | { type: "RECEIVE_COPILOT_RESPONSE"; payload: CopilotMessage };
```

---

### Step 3: 状態管理（`src/context/ChatContext.tsx`）

`useReducer` で以下のアクションを処理:

| アクション                         | 説明                           |
| ---------------------------------- | ------------------------------ |
| `SELECT_ROOM`                      | アクティブルーム切り替え       |
| `SEND_MESSAGE`                     | メインチャットにメッセージ送信 |
| `OPEN_THREAD` / `CLOSE_THREAD`     | スレッドパネル開閉             |
| `SEND_THREAD_MESSAGE`              | スレッドにリプライ送信         |
| `TOGGLE_COPILOT` / `CLOSE_COPILOT` | Copilotパネル開閉              |
| `SEND_COPILOT_MESSAGE`             | Copilotにメッセージ送信        |
| `RECEIVE_COPILOT_RESPONSE`         | ダミーAIレスポンス追加         |

- `ChatProvider` コンポーネントで `createContext` → `Provider` でラップ
- `useChatContext` フックでアクセス

---

### Step 4: モックデータ（`src/data/mockData.ts`）

- **5-6個のチャットルーム**: `#general`, `#random`, `#engineering`, `#design`, DM x2
- 各ルームに **10-15件のサンプルメッセージ**
- **3-4人のダミーユーザー**（アバターはイニシャルベースのプレースホルダー）
- **1-2個のサンプルスレッド**（各3-5件のリプライ付き）

---

### Step 5: レイアウト実装（`src/components/layout/AppLayout.tsx`）

- `flex` + `h-screen` で全画面レイアウト
- **Sidebar**: `w-64 flex-shrink-0` 固定幅、ダークグレー背景
- **ChatPanel**: `flex-1 min-w-0` で残りスペースを占有
- **ThreadPanel**: `w-[360px] flex-shrink-0`、`isThreadOpen` で条件表示。`transition-all` でスライドイン/アウト
- **CopilotPanel**: `w-[360px] flex-shrink-0`、`isCopilotOpen` で条件表示。独自のダークテーマ

---

### Step 6: サイドバー実装（Sidebar系コンポーネント）

- shadcn/ui の `ScrollArea` でスクロール可能なルームリスト
- 各 `RoomItem` にルーム名、未読バッジ（shadcn `Badge`）、アクティブ状態のハイライト
- 上部にワークスペース名 + ユーザーアバター
- ルーム種類に応じたアイコン表示（`#` チャンネル / DMアバター）
- React Bits の `ShinyText` を選択中ルームのヘッダーアクセントに活用

---

### Step 7: メインチャット実装（Chat系コンポーネント）

- **ChatHeader**: ルーム名 + メンバー数 + スレッドパネル/Copilotパネルのトグルアイコンボタン
- **MessageList**: shadcn `ScrollArea` で下方向固定スクロール。新メッセージ受信時に自動スクロール（`useRef` + `scrollIntoView`）
- **MessageItem**: アバター（イニシャル丸アイコン）、ユーザー名、タイムスタンプ、本文。ホバー時にリアクション・スレッド返信アイコン表示。メッセージクリック or 「返信」アイコンクリックでスレッドオープン
- **MessageInput**: shadcn `Textarea` + `Button`。Enter で送信、Shift+Enter で改行。添付ボタン（UI のみ）

---

### Step 8: スレッドパネル実装（Thread系コンポーネント）

- **ThreadHeader**: 親メッセージのプレビュー + 「×」閉じるボタン
- **ThreadMessageList**: 親メッセージ（ハイライト表示）+ リプライ一覧。`MessageItem` を再利用
- **ThreadInput**: `MessageInput` と同様の入力欄（「スレッドに返信」プレースホルダー）
- 右側ボーダーで区切り、背景色を Mainチャットより若干暗くして差別化

---

### Step 9: Copilotパネル実装（Copilot系コンポーネント）

VS Code GitHub Copilot風のデザイン:

- **ダークテーマの背景**（`bg-zinc-900`）
- **ヘッダー**: ✨ アイコン + 「Copilot」タイトル + 閉じるボタン
- **会話エリア**: ユーザー質問（右寄せバブル）+ AIレスポンス（左寄せ、`bg-zinc-800` バブル）
- **入力エリア**: 下部固定の入力欄（「スレッドについて質問...」プレースホルダー）
- **ダミーレスポンスロジック**: 送信後1-2秒のタイマーで定型文レスポンスを返す（タイピングアニメーション付き）
- React Bits の `DecryptedText` か `TextType` をAIレスポンスのタイピング演出に活用

---

### Step 10: shadcn/ui コンポーネント導入リスト

以下を `npx shadcn@latest add` でインストール:

| コンポーネント       | 用途                         |
| -------------------- | ---------------------------- |
| `button`             | 各種ボタン                   |
| `input` / `textarea` | メッセージ入力               |
| `scroll-area`        | メッセージリストのスクロール |
| `avatar`             | ユーザーアバター             |
| `badge`              | 未読カウント                 |
| `separator`          | セクション区切り             |
| `tooltip`            | アイコンボタンのツールチップ |

---

### Step 11: React Bits コンポーネント導入リスト

| コンポーネント                 | 用途                                            |
| ------------------------------ | ----------------------------------------------- |
| `Silk` or `Aurora`             | ログイン画面や空チャット状態の背景エフェクト    |
| `ShinyText`                    | アクティブルーム名やCopilotヘッダーのアクセント |
| `DecryptedText` or `SplitText` | Copilot AIレスポンスのテキスト出現演出          |

---

### Step 12: 仕上げ・調整

- `src/App.tsx` を書き換え: `ChatProvider` で `AppLayout` をラップ
- `src/App.css` の既存デモスタイルを削除
- `src/index.css` を Tailwind の `@import` に置き換え
- **レスポンシブ対応**: 小さい画面ではサイドバーをハンバーガーメニュー化、Thread/Copilotはオーバーレイ表示

---

## 動作確認チェックリスト

- [ ] `npm run dev` で開発サーバー起動 → ブラウザで4カラムレイアウトが表示される
- [ ] 左サイドバーでルームをクリック → メインチャットの内容が切り替わる
- [ ] メッセージの「返信」ボタンクリック → 右側にスレッドパネルがスライドインする
- [ ] ヘッダーのCopilotアイコンクリック → 最右側にCopilotパネルが開く
- [ ] Copilotに質問送信 → 1-2秒後にダミーレスポンスがタイピングアニメーション付きで表示される
- [ ] Thread/Copilot同時オープン → メインチャットが適切に縮小される
- [ ] `npx tsc --noEmit` でTypeScriptエラーがない
- [ ] `npx eslint .` でlintエラーがない

---

## 設計判断の記録

| 項目                 | 決定内容                     | 理由                                                         |
| -------------------- | ---------------------------- | ------------------------------------------------------------ |
| UI基盤               | shadcn/ui + React Bits 併用  | 基盤UIにshadcn/ui、ビジュアル演出にReact Bitsという役割分担  |
| 状態管理             | React Context + useReducer   | 外部ライブラリを使わず、React標準機能のみでシンプルに管理    |
| Copilot AI           | UIモック（ダミーレスポンス） | 実API接続なし。タイマーベースのダミーレスポンスで動作を模擬  |
| パネル表示           | トグル式スライドイン         | 常時表示ではなく、必要時にスライドイン表示して画面を有効活用 |
| コンポーネント再利用 | MessageItemを共用            | メインチャットとスレッドの両方で同一コンポーネントを使い回し |
