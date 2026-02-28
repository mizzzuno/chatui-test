import { useCallback } from "react";
import { useChatContext } from "@/hooks/useChatContext";
import { ThreadHeader } from "@/components/thread/ThreadHeader";
import { ThreadMessageList } from "@/components/thread/ThreadMessageList";
import { ThreadInput } from "@/components/thread/ThreadInput";
import { userMap } from "@/data/mockData";
import type { Message } from "@/types";

/**
 * スレッドパネル全体
 * - ThreadHeader: 親メッセージプレビュー + 閉じるボタン
 * - ThreadMessageList: 親メッセージ（ハイライト）+ リプライ一覧
 * - ThreadInput: スレッドに返信入力
 * - 背景色を Mainチャットより若干暗くして差別化
 */
export function ThreadPanel() {
  const { state, dispatch } = useChatContext();
  const thread = state.activeThread;

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_THREAD" });
  }, [dispatch]);

  const handleSend = useCallback(
    (content: string) => {
      const newMessage: Message = {
        id: `msg-thread-${Date.now()}`,
        userId: "user-1",
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: "SEND_THREAD_MESSAGE", payload: newMessage });
    },
    [dispatch],
  );

  if (!thread) return null;

  // スレッドの最初のメッセージを親メッセージとして利用
  const parentMessage = thread.messages[0];
  if (!parentMessage) return null;

  return (
    <div className="flex h-full flex-col bg-muted/30">
      <ThreadHeader
        parentMessage={parentMessage}
        parentUser={userMap[parentMessage.userId]}
        onClose={handleClose}
      />
      <ThreadMessageList messages={thread.messages} />
      <ThreadInput onSend={handleSend} />
    </div>
  );
}
