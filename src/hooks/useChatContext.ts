import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

/**
 * ChatContext にアクセスするためのカスタムフック
 * ChatProvider の外側で使用するとエラーをスローする
 */
export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
}
