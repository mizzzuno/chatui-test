import { useCallback } from "react";
import { useChatContext } from "@/hooks/useChatContext";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import type { Message, Thread } from "@/types";

/**
 * メインチャットエリア全体
 * - ChatHeader: ルーム名 + トグルボタン
 * - MessageList: メッセージ一覧（自動スクロール）
 * - MessageInput: 入力エリア（Enter送信）
 */
export function ChatPanel() {
  const { state, dispatch } = useChatContext();
  const activeRoom = state.rooms.find((r) => r.id === state.activeRoomId);
  const messages = state.messages[state.activeRoomId] ?? [];

  const handleSendMessage = useCallback(
    (content: string) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        userId: "user-1", // 自分のユーザーID（モック）
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: "SEND_MESSAGE", payload: newMessage });
    },
    [dispatch],
  );

  const handleOpenThread = useCallback(
    (thread: Thread) => {
      dispatch({ type: "OPEN_THREAD", payload: thread });
    },
    [dispatch],
  );

  return (
    <div className="flex h-full flex-col bg-background">
      <ChatHeader />

      {activeRoom ? (
        <>
          <MessageList messages={messages} onOpenThread={handleOpenThread} />
          <MessageInput
            placeholder={`#${activeRoom.name} にメッセージを送信`}
            onSend={handleSendMessage}
          />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          <p className="text-sm">
            左のサイドバーからチャンネルを選択してください
          </p>
        </div>
      )}
    </div>
  );
}
