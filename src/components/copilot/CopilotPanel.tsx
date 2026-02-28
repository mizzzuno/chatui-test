import { useChatContext } from "@/hooks/useChatContext";

/**
 * Copilotパネル全体
 * Step 9 で本実装する。ここではプレースホルダーを表示。
 */
export function CopilotPanel() {
  const { dispatch } = useChatContext();

  return (
    <div className="flex h-full flex-col bg-zinc-900 text-zinc-100">
      {/* Copilotヘッダー */}
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <span>✨</span>
          <h3 className="text-sm font-semibold">Copilot</h3>
        </div>
        <button
          onClick={() => dispatch({ type: "CLOSE_COPILOT" })}
          className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          title="閉じる"
        >
          ✕
        </button>
      </div>

      {/* Copilot会話エリア（プレースホルダー） */}
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        <p className="text-sm">AIとの会話がここに表示されます（Step 9 で実装）</p>
      </div>

      {/* Copilot入力エリア（プレースホルダー） */}
      <div className="border-t border-zinc-700 px-4 py-3">
        <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-500">
          スレッドについて質問...（Step 9 で実装）
        </div>
      </div>
    </div>
  );
}
