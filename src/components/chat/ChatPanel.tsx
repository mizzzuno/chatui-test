import { useChatContext } from "@/hooks/useChatContext";

/**
 * メインチャットエリア全体
 * Step 7 で本実装する。ここではプレースホルダーを表示。
 */
export function ChatPanel() {
  const { state, dispatch } = useChatContext();
  const activeRoom = state.rooms.find((r) => r.id === state.activeRoomId);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* チャットヘッダー */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          {activeRoom && (
            <>
              <span className="text-muted-foreground">
                {activeRoom.type === "channel" ? "#" : ""}
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                {activeRoom?.name ?? "チャンネルを選択"}
              </h2>
            </>
          )}
          {!activeRoom && (
            <h2 className="text-lg font-semibold text-muted-foreground">
              チャンネルを選択してください
            </h2>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* スレッドトグル */}
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
            title="スレッド"
          >
            💬
          </button>
          {/* Copilotトグル */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_COPILOT" })}
            className={`rounded-md p-2 text-sm transition-colors ${
              state.isCopilotOpen
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            title="Copilot"
          >
            ✨
          </button>
        </div>
      </div>

      {/* メッセージエリア（プレースホルダー） */}
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        {activeRoom ? (
          <p className="text-sm">
            #{activeRoom.name} のメッセージがここに表示されます
          </p>
        ) : (
          <p className="text-sm">
            左のサイドバーからチャンネルを選択してください
          </p>
        )}
      </div>

      {/* 入力エリア（プレースホルダー） */}
      {activeRoom && (
        <div className="border-t border-border px-4 py-3">
          <div className="rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground">
            #{activeRoom.name} にメッセージを送信（Step 7 で実装）
          </div>
        </div>
      )}
    </div>
  );
}
