import { useState, useEffect, useCallback } from "react";
import { useChatContext } from "@/hooks/useChatContext";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ThreadPanel } from "@/components/thread/ThreadPanel";
import { CopilotPanel } from "@/components/copilot/CopilotPanel";

/**
 * 4カラムレイアウトのルートコンポーネント（レスポンシブ対応）
 *
 * Desktop (md+):
 * ┌──────────┬──────────────────────┬─────────────┬─────────────┐
 * │ Sidebar  │    Main Chat Area    │   Thread    │   Copilot   │
 * │ (256px)  │    (flex-1)          │   (360px)   │   (360px)   │
 * └──────────┴──────────────────────┴─────────────┴─────────────┘
 *
 * Mobile (<md):
 * - サイドバーはハンバーガーメニューでオーバーレイ表示
 * - Thread/Copilot パネルは画面全体をオーバーレイ表示
 */
export function AppLayout() {
  const { state } = useChatContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ルーム選択時にモバイルサイドバーを閉じる
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [state.activeRoomId]);

  // モバイルでパネルが開いた際にbodyスクロールを抑制
  const isMobileOverlay = state.isThreadOpen || state.isCopilotOpen;

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-background">
      {/* === Mobile: ハンバーガーメニューボタン === */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-3 left-3 z-50 rounded-md bg-zinc-800 p-2 text-zinc-100 shadow-lg transition-opacity md:hidden"
        aria-label="メニューを開く"
      >
        ☰
      </button>

      {/* === Sidebar: Desktop 固定 / Mobile オーバーレイ === */}
      {/* Desktop */}
      <div className="hidden w-64 shrink-0 md:block">
        <Sidebar />
      </div>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          />
          {/* Sidebar drawer */}
          <div className="relative h-full w-64 shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar />
          </div>
        </div>
      )}

      {/* === Main Chat Area === */}
      <div className="flex-1 min-w-0 pl-10 md:pl-0">
        <ChatPanel />
      </div>

      {/* === Thread Panel: Desktop スライドイン / Mobile オーバーレイ === */}
      {/* Desktop */}
      <div
        className={`hidden shrink-0 overflow-hidden border-l border-border transition-all duration-300 ease-in-out md:block ${
          state.isThreadOpen ? "md:w-90" : "md:w-0"
        }`}
      >
        {state.isThreadOpen && (
          <div className="w-90 h-full">
            <ThreadPanel />
          </div>
        )}
      </div>
      {/* Mobile overlay */}
      {state.isThreadOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm shadow-2xl animate-in slide-in-from-right duration-200">
            <ThreadPanel />
          </div>
        </div>
      )}

      {/* === Copilot Panel: Desktop スライドイン / Mobile オーバーレイ === */}
      {/* Desktop */}
      <div
        className={`hidden shrink-0 overflow-hidden border-l border-border transition-all duration-300 ease-in-out md:block ${
          state.isCopilotOpen ? "md:w-90" : "md:w-0"
        }`}
      >
        {state.isCopilotOpen && (
          <div className="w-90 h-full">
            <CopilotPanel />
          </div>
        )}
      </div>
      {/* Mobile overlay */}
      {state.isCopilotOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm shadow-2xl animate-in slide-in-from-right duration-200">
            <CopilotPanel />
          </div>
        </div>
      )}
    </div>
  );
}
