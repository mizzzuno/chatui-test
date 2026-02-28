import type { Message, User } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ThreadHeaderProps = {
  parentMessage: Message;
  parentUser?: User;
  onClose: () => void;
};

/**
 * スレッドヘッダー
 * - 親メッセージのプレビュー
 * - 「×」閉じるボタン
 */
export function ThreadHeader({
  parentMessage,
  parentUser,
  onClose,
}: ThreadHeaderProps) {
  return (
    <div className="border-b border-border px-4 py-3">
      {/* ヘッダー行 */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">スレッド</h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          title="閉じる"
        >
          ✕
        </button>
      </div>

      {/* 親メッセージプレビュー */}
      <div className="mt-2 flex items-start gap-2 rounded-md bg-accent/30 p-2">
        <Avatar className="mt-0.5 h-6 w-6 shrink-0">
          <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
            {parentUser?.avatar ?? "??"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-foreground">
            {parentUser?.name ?? "Unknown"}
          </span>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {parentMessage.content}
          </p>
        </div>
      </div>
    </div>
  );
}
