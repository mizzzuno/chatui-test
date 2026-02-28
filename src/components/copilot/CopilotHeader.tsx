import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ShinyText from "@/components/reactbits/ShinyText";

type CopilotHeaderProps = {
  onClose: () => void;
};

/**
 * Copilotパネルのヘッダー
 * ✨ アイコン + 「Copilot」タイトル + 閉じるボタン
 */
export function CopilotHeader({ onClose }: CopilotHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-base">✨</span>
        <h3 className="text-sm font-semibold">
          <ShinyText text="Copilot" speed={3} className="text-zinc-100" />
        </h3>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            ✕
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">閉じる</TooltipContent>
      </Tooltip>
    </div>
  );
}
