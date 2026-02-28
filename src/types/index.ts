// ユーザー
export type User = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
};

// メッセージ
export type Message = {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  threadId?: string;
  reactions?: Reaction[];
};

// リアクション
export type Reaction = {
  emoji: string;
  userIds: string[];
};

// スレッド
export type Thread = {
  id: string;
  parentMessageId: string;
  messages: Message[];
  participantIds: string[];
};

// チャットルーム
export type Room = {
  id: string;
  name: string;
  icon?: string;
  type: "channel" | "dm";
  unreadCount: number;
};

// Copilotメッセージ
export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

// チャット全体の状態
export type ChatState = {
  rooms: Room[];
  activeRoomId: string;
  messages: Record<string, Message[]>;
  activeThread: Thread | null;
  isThreadOpen: boolean;
  isCopilotOpen: boolean;
  copilotMessages: CopilotMessage[];
};

// アクション（discriminated union）
export type ChatAction =
  | { type: "SELECT_ROOM"; payload: string }
  | { type: "SEND_MESSAGE"; payload: Message }
  | { type: "OPEN_THREAD"; payload: Thread }
  | { type: "CLOSE_THREAD" }
  | { type: "SEND_THREAD_MESSAGE"; payload: Message }
  | { type: "TOGGLE_COPILOT" }
  | { type: "CLOSE_COPILOT" }
  | { type: "SEND_COPILOT_MESSAGE"; payload: CopilotMessage }
  | { type: "RECEIVE_COPILOT_RESPONSE"; payload: CopilotMessage };
