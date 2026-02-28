import { useChatContext } from "@/hooks/useChatContext";

/**
 * スレッドパネル全体
 * Step 8 で本実装する。ここではプレースホルダーを表示。
 */
export function ThreadPanel() {
  const { dispatch } = useChatContext();

  return (
    <div className="flex h-full flex-col bg-muted/30">
      {/* スレッドヘッダー */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">スレッド</h3>
        <button
          onClick={() => dispatch({ type: "CLOSE_THREAD" })}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          title="閉じる"
        >
          ✕
        </button>
      </div>

      {/* スレッドメッセージエリア（プレースホルダー） */}
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p className="text-sm">スレッドメッセージがここに表示されます（Step 8 で実装）</p>
      </div>

      {/* スレッド入力エリア（プレースホルダー） */}
      <div className="border-t border-border px-4 py-3">
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground">
          スレッドに返信（Step 8 で実装）
        </div>
      </div>
    </div>
  );
}
