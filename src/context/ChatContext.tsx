import { createContext, useReducer, type ReactNode } from "react";
import type { ChatState, ChatAction } from "@/types";

// 初期状態
const initialState: ChatState = {
  rooms: [],
  activeRoomId: "",
  messages: {},
  activeThread: null,
  isThreadOpen: false,
  isCopilotOpen: false,
  copilotMessages: [],
};

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    // アクティブルーム切り替え
    case "SELECT_ROOM":
      return {
        ...state,
        activeRoomId: action.payload,
        // ルーム切り替え時にスレッドを閉じる
        isThreadOpen: false,
        activeThread: null,
      };

    // メインチャットにメッセージ送信
    case "SEND_MESSAGE": {
      const roomId = state.activeRoomId;
      const currentMessages = state.messages[roomId] ?? [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [roomId]: [...currentMessages, action.payload],
        },
      };
    }

    // スレッドパネルを開く
    case "OPEN_THREAD":
      return {
        ...state,
        activeThread: action.payload,
        isThreadOpen: true,
      };

    // スレッドパネルを閉じる
    case "CLOSE_THREAD":
      return {
        ...state,
        activeThread: null,
        isThreadOpen: false,
      };

    // スレッドにリプライ送信
    case "SEND_THREAD_MESSAGE": {
      if (!state.activeThread) return state;
      return {
        ...state,
        activeThread: {
          ...state.activeThread,
          messages: [...state.activeThread.messages, action.payload],
        },
      };
    }

    // Copilotパネルの開閉トグル
    case "TOGGLE_COPILOT":
      return {
        ...state,
        isCopilotOpen: !state.isCopilotOpen,
      };

    // Copilotパネルを閉じる
    case "CLOSE_COPILOT":
      return {
        ...state,
        isCopilotOpen: false,
      };

    // Copilotにメッセージ送信
    case "SEND_COPILOT_MESSAGE":
      return {
        ...state,
        copilotMessages: [...state.copilotMessages, action.payload],
      };

    // ダミーAIレスポンス追加
    case "RECEIVE_COPILOT_RESPONSE":
      return {
        ...state,
        copilotMessages: [...state.copilotMessages, action.payload],
      };

    default:
      return state;
  }
}

// Context の型定義
type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};

// Context 作成
export const ChatContext = createContext<ChatContextType | null>(null);

// Provider コンポーネント
type ChatProviderProps = {
  children: ReactNode;
  initialData?: Partial<ChatState>;
};

export function ChatProvider({ children, initialData }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    ...initialData,
  });

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
