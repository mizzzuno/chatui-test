import type { Room } from "@/types";
import { Badge } from "@/components/ui/badge";

type RoomItemProps = {
  room: Room;
  isActive: boolean;
  onSelect: (roomId: string) => void;
};

/**
 * 個別ルーム行
 * - ルーム種類に応じたアイコン表示（# チャンネル / ● DM）
 * - アクティブ状態のハイライト
 * - 未読バッジ（shadcn Badge）
 */
export function RoomItem({ room, isActive, onSelect }: RoomItemProps) {
  return (
    <button
      onClick={() => onSelect(room.id)}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-zinc-700 text-white font-semibold"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
      }`}
    >
      {/* ルーム種類アイコン */}
      <span
        className={`shrink-0 text-xs ${
          isActive ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {room.type === "channel" ? (
          <span className="font-bold">#</span>
        ) : (
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-500" />
        )}
      </span>

      {/* ルーム名 */}
      <span className="truncate">{room.name}</span>

      {/* 未読バッジ */}
      {room.unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="ml-auto h-4 min-w-4 justify-center rounded-full px-1 py-0 text-[10px] font-bold leading-none"
        >
          {room.unreadCount}
        </Badge>
      )}
    </button>
  );
}
