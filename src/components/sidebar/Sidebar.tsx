import { useChatContext } from "@/hooks/useChatContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RoomList } from "@/components/sidebar/RoomList";
import ShinyText from "@/components/reactbits/ShinyText";

/**
 * 左サイドバー全体
 * - 上部にワークスペース名 + ユーザーアバター
 * - 選択中ルーム名を ShinyText アクセントで表示
 * - RoomList でチャンネル / DM を一覧表示
 */
export function Sidebar() {
  const { state, dispatch } = useChatContext();
  const activeRoom = state.rooms.find((r) => r.id === state.activeRoomId);

  return (
    <div className="flex h-full flex-col bg-zinc-900 text-zinc-100">
      {/* ワークスペースヘッダー */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-lg font-bold tracking-tight">ChatUI</span>
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-zinc-700 text-xs text-zinc-300">
            Me
          </AvatarFallback>
        </Avatar>
      </div>

      {/* アクティブルーム ShinyText アクセント */}
      {activeRoom && (
        <div className="px-4 pb-2">
          <ShinyText
            text={
              activeRoom.type === "channel"
                ? `# ${activeRoom.name}`
                : activeRoom.name
            }
            speed={3}
            className="text-xs font-semibold"
          />
        </div>
      )}

      <Separator className="bg-zinc-700" />

      {/* ルームリスト */}
      <RoomList
        rooms={state.rooms}
        activeRoomId={state.activeRoomId}
        onSelectRoom={(roomId) =>
          dispatch({ type: "SELECT_ROOM", payload: roomId })
        }
      />
    </div>
  );
}
