import { useState, useCallback, type KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MessageInputProps = {
  placeholder?: string;
  onSend: (content: string) => void;
};

/**
 * メッセージ入力エリア
 * - shadcn Textarea + Button
 * - Enter で送信、Shift+Enter で改行
 * - 添付ボタン（UI のみ）
 */
export function MessageInput({
  placeholder = "メッセージを入力...",
  onSend,
}: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }, [value, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="border-t border-border px-4 py-3">
      <div className="flex items-end gap-2">
        {/* 添付ボタン（UIのみ） */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground"
            >
              📎
            </Button>
          </TooltipTrigger>
          <TooltipContent>ファイルを添付</TooltipContent>
        </Tooltip>

        {/* テキスト入力 */}
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="min-h-9 max-h-32 resize-none"
        />

        {/* 送信ボタン */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-9 w-9 shrink-0"
              disabled={!value.trim()}
              onClick={handleSend}
            >
              ➤
            </Button>
          </TooltipTrigger>
          <TooltipContent>送信</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
