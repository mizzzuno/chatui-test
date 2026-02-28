import { useChatContext } from "@/hooks/useChatContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * チャットヘッダー
 * - ルーム名 + メンバー数
 * - スレッドパネル / Copilotパネル のトグルアイコンボタン
 */
export function ChatHeader() {
  const { state, dispatch } = useChatContext();
  const activeRoom = state.rooms.find((r) => r.id === state.activeRoomId);

  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      {/* 左: ルーム情報 */}
      <div className="flex items-center gap-2">
        {activeRoom ? (
          <>
            <span className="text-muted-foreground">
              {activeRoom.type === "channel" ? "#" : ""}
            </span>
            <h2 className="text-lg font-semibold text-foreground">
              {activeRoom.name}
            </h2>
          </>
        ) : (
          <h2 className="text-lg font-semibold text-muted-foreground">
            チャンネルを選択してください
          </h2>
        )}
      </div>

      {/* 右: トグルボタン */}
      <div className="flex items-center gap-1">
        {/* スレッドトグル */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() =>
                state.isThreadOpen
                  ? dispatch({ type: "CLOSE_THREAD" })
                  : undefined
              }
              className={`rounded-md p-2 text-sm transition-colors ${
                state.isThreadOpen
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              💬
            </button>
          </TooltipTrigger>
          <TooltipContent>スレッド</TooltipContent>
        </Tooltip>

        {/* Copilotトグル */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => dispatch({ type: "TOGGLE_COPILOT" })}
              className={`rounded-md p-2 text-sm transition-colors ${
                state.isCopilotOpen
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              ✨
            </button>
          </TooltipTrigger>
          <TooltipContent>Copilot</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
