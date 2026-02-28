import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageItem } from "@/components/chat/MessageItem";
import { userMap } from "@/data/mockData";

type ThreadMessageListProps = {
  messages: Message[];
};

/**
 * スレッド内メッセージ一覧
 * - 親メッセージ（ハイライト表示）+ リプライ一覧
 * - MessageItem を再利用
 * - 新メッセージで自動スクロール
 */
export function ThreadMessageList({ messages }: ThreadMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <p className="text-sm">リプライはまだありません</p>
      </div>
    );
  }

  // 最初のメッセージを親メッセージ、残りをリプライとして扱う
  const [parentMsg, ...replies] = messages;

  return (
    <ScrollArea className="flex-1">
      <div className="py-2">
        {/* 親メッセージ（ハイライト） */}
        <div className="bg-accent/20">
          <MessageItem
            message={parentMsg}
            user={userMap[parentMsg.userId]}
          />
        </div>

        {replies.length > 0 && (
          <>
            <div className="px-4 py-2">
              <Separator />
              <p className="mt-2 text-xs text-muted-foreground">
                {replies.length} 件の返信
              </p>
            </div>

            {/* リプライ一覧 */}
            {replies.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                user={userMap[msg.userId]}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
