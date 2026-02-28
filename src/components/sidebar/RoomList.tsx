import type { Room } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RoomItem } from "@/components/sidebar/RoomItem";

type RoomListProps = {
  rooms: Room[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
};

/**
 * ルーム一覧
 * - shadcn/ui ScrollArea でスクロール可能
 * - チャンネルとDMをセクション分け
 */
export function RoomList({ rooms, activeRoomId, onSelectRoom }: RoomListProps) {
  const channels = rooms.filter((r) => r.type === "channel");
  const dms = rooms.filter((r) => r.type === "dm");

  return (
    <ScrollArea className="flex-1">
      <div className="px-2 py-2 space-y-3">
        {/* チャンネルセクション */}
        <div>
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Channels
          </p>
          <div className="space-y-0.5">
            {channels.map((room) => (
              <RoomItem
                key={room.id}
                room={room}
                isActive={activeRoomId === room.id}
                onSelect={onSelectRoom}
              />
            ))}
          </div>
        </div>

        <Separator className="bg-zinc-700" />

        {/* DMセクション */}
        <div>
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Direct Messages
          </p>
          <div className="space-y-0.5">
            {dms.map((room) => (
              <RoomItem
                key={room.id}
                room={room}
                isActive={activeRoomId === room.id}
                onSelect={onSelectRoom}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
