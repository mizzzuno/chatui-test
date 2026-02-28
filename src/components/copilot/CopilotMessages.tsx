import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DecryptedText from "@/components/reactbits/DecryptedText";
import Aurora from "@/components/reactbits/Aurora";
import type { CopilotMessage } from "@/types";

type CopilotMessagesProps = {
  messages: CopilotMessage[];
  /** 最新の assistant メッセージをアニメーション表示するかどうか */
  isTyping: boolean;
};

/**
 * Copilot会話エリア
 * - ユーザー質問: 右寄せバブル
 * - AIレスポンス: 左寄せ bg-zinc-800 バブル + DecryptedText タイピング演出
 */
export function CopilotMessages({ messages, isTyping }: CopilotMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="relative flex flex-1 items-center justify-center text-zinc-500">
        <Aurora
          colorStops={["#6366F1", "#8B5CF6", "#A78BFA"]}
          blend={0.25}
          amplitude={0.6}
          speed={0.4}
        />
        <div className="relative z-10 text-center">
          <p className="text-2xl">✨</p>
          <p className="mt-2 text-sm">Copilotに何でも質問してください</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 px-4 py-4">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const isLatestAssistant =
            msg.role === "assistant" && index === messages.length - 1;

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                {/* 最新の assistant メッセージに DecryptedText アニメーション */}
                {isLatestAssistant && isTyping ? (
                  <DecryptedText
                    text={msg.content}
                    speed={30}
                    maxIterations={8}
                    sequential
                    revealDirection="start"
                    animateOn="view"
                    className="text-zinc-200"
                    encryptedClassName="text-zinc-500"
                  />
                ) : (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                )}
              </div>
            </div>
          );
        })}

        {/* タイピングインジケーター（レスポンス待ち中） */}
        {isTyping && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-400">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.15s]">●</span>
                <span className="animate-bounce [animation-delay:0.3s]">●</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
