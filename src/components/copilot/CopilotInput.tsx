import { useState, useCallback, type KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CopilotInputProps = {
  onSend: (content: string) => void;
  disabled?: boolean;
};

/**
 * Copilot入力エリア
 * - ダークテーマ対応
 * - Enter で送信、Shift+Enter で改行
 */
export function CopilotInput({ onSend, disabled = false }: CopilotInputProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }, [value, onSend, disabled]);

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
    <div className="border-t border-zinc-700 px-4 py-3">
      <div className="flex items-end gap-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="スレッドについて質問..."
          rows={1}
          disabled={disabled}
          className="min-h-[40px] flex-1 resize-none border-zinc-700 bg-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className="h-9 w-9 shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
            >
              ▶
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">送信</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
