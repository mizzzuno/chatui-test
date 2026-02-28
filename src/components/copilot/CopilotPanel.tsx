import { useCallback, useRef, useState } from "react";
import { useChatContext } from "@/hooks/useChatContext";
import { CopilotHeader } from "./CopilotHeader";
import { CopilotMessages } from "./CopilotMessages";
import { CopilotInput } from "./CopilotInput";
import type { CopilotMessage } from "@/types";

/** ダミーAIレスポンスの定型文 */
const DUMMY_RESPONSES = [
  "なるほど、それは興味深い質問ですね。このスレッドの文脈から考えると、チームメンバーの提案に沿った方向で進めるのが良さそうです。",
  "ご質問ありがとうございます！この件については、まずドキュメントを確認することをお勧めします。何か追加のご質問があればお気軽にどうぞ。",
  "いい質問ですね。要点をまとめると：\n1. 現在の実装は問題なく動作しています\n2. パフォーマンスの改善余地があります\n3. テストカバレッジを上げることを推奨します",
  "その件について、いくつか考慮すべき点があります。セキュリティ面とユーザー体験の両方を考慮に入れる必要があります。",
  "確かにそのアプローチは有効です。ただし、スケーラビリティの観点からは別のパターンも検討してみてください。",
];

/**
 * Copilotパネル全体
 * - ダークテーマ（bg-zinc-900）
 * - ダミーレスポンスロジック（1〜2秒の遅延）
 * - DecryptedText によるタイピング演出
 */
export function CopilotPanel() {
  const { state, dispatch } = useChatContext();
  const [isTyping, setIsTyping] = useState(false);
  const responseIndexRef = useRef(0);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_COPILOT" });
  }, [dispatch]);

  const handleSend = useCallback(
    (content: string) => {
      // ユーザーメッセージを送信
      const userMessage: CopilotMessage = {
        id: `copilot-user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: "SEND_COPILOT_MESSAGE", payload: userMessage });

      // タイピング表示開始
      setIsTyping(true);

      // 1〜2秒後にダミーレスポンスを返す
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        const responseText =
          DUMMY_RESPONSES[responseIndexRef.current % DUMMY_RESPONSES.length];
        responseIndexRef.current += 1;

        const aiMessage: CopilotMessage = {
          id: `copilot-ai-${Date.now()}`,
          role: "assistant",
          content: responseText,
          timestamp: new Date().toISOString(),
        };
        dispatch({ type: "RECEIVE_COPILOT_RESPONSE", payload: aiMessage });

        // DecryptedText アニメーション用に少し遅延してから typing 解除
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }, delay);
    },
    [dispatch],
  );

  return (
    <div className="flex h-full flex-col bg-zinc-900 text-zinc-100">
      <CopilotHeader onClose={handleClose} />
      <CopilotMessages
        messages={state.copilotMessages}
        isTyping={isTyping}
      />
      <CopilotInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
