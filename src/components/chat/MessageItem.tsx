import type { Message, User, Thread } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MessageItemProps = {
  message: Message;
  user?: User;
  /** スレッドオープン時のコールバック（thread 情報がある場合） */
  onOpenThread?: (thread: Thread) => void;
  /** このメッセージに紐づくスレッド（threadId → Thread マップから引いたもの） */
  thread?: Thread;
  /** コンパクト表示（スレッド内リプライ用） */
  compact?: boolean;
};

/**
 * 個別メッセージ
 * - アバター（イニシャル丸アイコン）
 * - ユーザー名、タイムスタンプ、本文
 * - ホバー時にリアクション・スレッド返信アイコン表示
 */
export function MessageItem({
  message,
  user,
  onOpenThread,
  thread,
  compact = false,
}: MessageItemProps) {
  const time = new Date(message.timestamp);
  const timeStr = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="group relative flex gap-3 px-4 py-1.5 hover:bg-accent/30 transition-colors">
      {/* アバター */}
      {!compact ? (
        <Avatar className="mt-0.5 h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            {user?.avatar ?? "??"}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8 shrink-0" />
      )}

      {/* メッセージ本体 */}
      <div className="min-w-0 flex-1">
        {!compact && (
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-foreground">
              {user?.name ?? "Unknown"}
            </span>
            <span className="text-[11px] text-muted-foreground">{timeStr}</span>
          </div>
        )}
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
          {compact && (
            <span className="mr-2 text-[11px] text-muted-foreground">
              {timeStr}
            </span>
          )}
          {message.content}
        </p>

        {/* リアクション表示 */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {message.reactions.map((reaction, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs"
              >
                {reaction.emoji}
                <span className="text-muted-foreground">
                  {reaction.userIds.length}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* スレッドリンク（threadId が付いている場合） */}
        {thread && onOpenThread && (
          <button
            onClick={() => onOpenThread(thread)}
            className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 hover:underline"
          >
            💬 {thread.messages.length} 件の返信
          </button>
        )}
      </div>

      {/* ホバー時アクションバー */}
      <div className="absolute -top-3 right-4 hidden items-center gap-0.5 rounded-md border border-border bg-background px-1 py-0.5 shadow-sm group-hover:flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded p-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              😀
            </button>
          </TooltipTrigger>
          <TooltipContent>リアクション</TooltipContent>
        </Tooltip>

        {thread && onOpenThread && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onOpenThread(thread)}
                className="rounded p-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                💬
              </button>
            </TooltipTrigger>
            <TooltipContent>スレッドで返信</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
