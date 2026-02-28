import { MessageInput } from "@/components/chat/MessageInput";

type ThreadInputProps = {
  onSend: (content: string) => void;
};

/**
 * スレッド返信入力
 * - MessageInput を再利用（「スレッドに返信」プレースホルダー）
 */
export function ThreadInput({ onSend }: ThreadInputProps) {
  return <MessageInput placeholder="スレッドに返信..." onSend={onSend} />;
}
