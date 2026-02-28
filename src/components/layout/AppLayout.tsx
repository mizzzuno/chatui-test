import { useChatContext } from "@/hooks/useChatContext";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ThreadPanel } from "@/components/thread/ThreadPanel";
import { CopilotPanel } from "@/components/copilot/CopilotPanel";

/**
 * 4カラムレイアウトのルートコンポーネント
 *
 * ┌──────────┬──────────────────────┬─────────────┬─────────────┐
 * │ Sidebar  │    Main Chat Area    │   Thread    │   Copilot   │
 * │ (256px)  │    (flex-1)          │   (360px)   │   (360px)   │
 * └──────────┴──────────────────────┴─────────────┴─────────────┘
 *
 * Thread パネルと Copilot パネルは開閉トグル可能。
 * 閉じた状態では Main Chat Area が広がる。
 */
export function AppLayout() {
  const { state } = useChatContext();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar: 固定幅、ダークグレー背景 */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Main Chat Area: 残りスペースを占有 */}
      <div className="flex-1 min-w-0">
        <ChatPanel />
      </div>

      {/* Thread Panel: 条件表示、スライドイン/アウト */}
      <div
        className={`shrink-0 overflow-hidden border-l border-border transition-all duration-300 ease-in-out ${
          state.isThreadOpen ? "w-90" : "w-0"
        }`}
      >
        {state.isThreadOpen && (
          <div className="w-90 h-full">
            <ThreadPanel />
          </div>
        )}
      </div>

      {/* Copilot Panel: 条件表示、独自のダークテーマ */}
      <div
        className={`shrink-0 overflow-hidden border-l border-border transition-all duration-300 ease-in-out ${
          state.isCopilotOpen ? "w-90" : "w-0"
        }`}
      >
        {state.isCopilotOpen && (
          <div className="w-90 h-full">
            <CopilotPanel />
          </div>
        )}
      </div>
    </div>
  );
}
