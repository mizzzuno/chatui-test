import { useEffect, useRef } from "react";
import type { Message, Thread } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem } from "@/components/chat/MessageItem";
import { userMap, mockThreads } from "@/data/mockData";
import Aurora from "@/components/reactbits/Aurora";

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
          <div className="relative flex h-full items-center justify-center px-4 py-20 text-muted-foreground">
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={0.3}
              amplitude={0.8}
              speed={0.3}
            />
            <p className="relative z-10 text-sm">まだメッセージがありません</p>
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
