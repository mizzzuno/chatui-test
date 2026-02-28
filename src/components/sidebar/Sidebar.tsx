import { useChatContext } from "@/hooks/useChatContext";

/**
 * 左サイドバー全体
 * Step 6 で本実装する。ここではプレースホルダーを表示。
 */
export function Sidebar() {
  const { state, dispatch } = useChatContext();

  return (
    <div className="flex h-full flex-col bg-zinc-900 text-zinc-100">
      {/* ワークスペースヘッダー */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700">
        <span className="text-lg font-bold tracking-tight">ChatUI</span>
      </div>

      {/* ルームリスト */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {state.rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => dispatch({ type: "SELECT_ROOM", payload: room.id })}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
              state.activeRoomId === room.id
                ? "bg-zinc-700 text-white font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span className="text-zinc-500">
              {room.type === "channel" ? "#" : "●"}
            </span>
            <span className="truncate">{room.name}</span>
            {room.unreadCount > 0 && (
              <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                {room.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
