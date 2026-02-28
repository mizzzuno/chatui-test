import { useEffect, useRef } from "react";
import type { Message, Thread } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem } from "@/components/chat/MessageItem";
import { userMap, mockThreads } from "@/data/mockData";

type MessageListProps = {
  messages: Message[];
  onOpenThread: (thread: Thread) => void;
};

/**
 * メッセージ一覧
 * - shadcn ScrollArea で下方向固定スクロール
 * - 新メッセージ受信時に自動スクロール
 */
export function MessageList({ messages, onOpenThread }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // メッセージが増えたら自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <ScrollArea className="flex-1">
      <div className="py-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4 py-20 text-muted-foreground">
            <p className="text-sm">まだメッセージがありません</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              user={userMap[msg.userId]}
              thread={msg.threadId ? mockThreads[msg.threadId] : undefined}
              onOpenThread={onOpenThread}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
