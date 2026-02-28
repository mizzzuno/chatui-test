import { ChatProvider } from "@/context/ChatContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockRooms, mockMessages } from "@/data/mockData";

function App() {
  return (
    <ChatProvider
      initialData={{
        rooms: mockRooms,
        activeRoomId: mockRooms[0]?.id ?? "",
        messages: mockMessages,
      }}
    >
      <AppLayout />
    </ChatProvider>
  );
}

export default App;
