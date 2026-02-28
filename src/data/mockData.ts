import type { User, Room, Message, Thread } from "@/types";

// ============================================================
// ダミーユーザー（4人）
// ============================================================
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "田中 太郎",
    avatar: "TT",
    status: "online",
  },
  {
    id: "user-2",
    name: "佐藤 花子",
    avatar: "SH",
    status: "online",
  },
  {
    id: "user-3",
    name: "鈴木 一郎",
    avatar: "SI",
    status: "away",
  },
  {
    id: "user-4",
    name: "高橋 美咲",
    avatar: "TM",
    status: "offline",
  },
];

// ユーザーIDからユーザーを引くためのマップ
export const userMap: Record<string, User> = Object.fromEntries(
  mockUsers.map((u) => [u.id, u])
);

// ============================================================
// チャットルーム（6個: チャンネル4 + DM2）
// ============================================================
export const mockRooms: Room[] = [
  {
    id: "room-general",
    name: "general",
    icon: "#",
    type: "channel",
    unreadCount: 3,
  },
  {
    id: "room-random",
    name: "random",
    icon: "#",
    type: "channel",
    unreadCount: 0,
  },
  {
    id: "room-engineering",
    name: "engineering",
    icon: "#",
    type: "channel",
    unreadCount: 5,
  },
  {
    id: "room-design",
    name: "design",
    icon: "#",
    type: "channel",
    unreadCount: 1,
  },
  {
    id: "room-dm-hanako",
    name: "佐藤 花子",
    type: "dm",
    unreadCount: 2,
  },
  {
    id: "room-dm-ichiro",
    name: "鈴木 一郎",
    type: "dm",
    unreadCount: 0,
  },
];

// ============================================================
// ヘルパー: タイムスタンプ生成
// ============================================================
function ts(hour: number, minute: number): string {
  return new Date(2026, 2, 1, hour, minute).toISOString();
}

// ============================================================
// メッセージデータ（ルームIDをキーとした Record）
// ============================================================
export const mockMessages: Record<string, Message[]> = {
  // ── #general ──────────────────────────────────────────────
  "room-general": [
    {
      id: "msg-g-1",
      userId: "user-1",
      content: "おはようございます！今日もよろしくお願いします 🙌",
      timestamp: ts(9, 0),
    },
    {
      id: "msg-g-2",
      userId: "user-2",
      content: "おはようございます！",
      timestamp: ts(9, 1),
    },
    {
      id: "msg-g-3",
      userId: "user-3",
      content: "おはようございます。今日のスタンドアップは10時からですよね？",
      timestamp: ts(9, 5),
    },
    {
      id: "msg-g-4",
      userId: "user-1",
      content: "はい、10時からです。会議室Bで行います。",
      timestamp: ts(9, 6),
      threadId: "thread-1",
    },
    {
      id: "msg-g-5",
      userId: "user-4",
      content: "了解です！少し遅れるかもしれませんが参加します。",
      timestamp: ts(9, 10),
    },
    {
      id: "msg-g-6",
      userId: "user-2",
      content: "今日のランチ、誰か一緒に行きませんか？ 🍜",
      timestamp: ts(11, 30),
      reactions: [
        { emoji: "👍", userIds: ["user-1", "user-3"] },
        { emoji: "🍜", userIds: ["user-4"] },
      ],
    },
    {
      id: "msg-g-7",
      userId: "user-3",
      content: "行きます！12時でどうですか？",
      timestamp: ts(11, 32),
    },
    {
      id: "msg-g-8",
      userId: "user-1",
      content: "いいですね！新しくできたラーメン屋さん気になります",
      timestamp: ts(11, 35),
    },
    {
      id: "msg-g-9",
      userId: "user-4",
      content: "午後のミーティングのアジェンダ共有します。各自確認をお願いします。",
      timestamp: ts(13, 0),
    },
    {
      id: "msg-g-10",
      userId: "user-2",
      content: "確認しました！準備しておきます 📋",
      timestamp: ts(13, 15),
    },
    {
      id: "msg-g-11",
      userId: "user-1",
      content:
        "リリースノートのドラフトを作成しました。レビューお願いします！",
      timestamp: ts(15, 0),
      threadId: "thread-2",
      reactions: [{ emoji: "👀", userIds: ["user-2", "user-3", "user-4"] }],
    },
    {
      id: "msg-g-12",
      userId: "user-3",
      content: "お疲れ様でした！今日も一日ありがとうございました。",
      timestamp: ts(18, 0),
    },
  ],

  // ── #random ───────────────────────────────────────────────
  "room-random": [
    {
      id: "msg-r-1",
      userId: "user-2",
      content: "週末に撮った写真です 📸 天気が最高でした！",
      timestamp: ts(9, 30),
      reactions: [
        { emoji: "❤️", userIds: ["user-1", "user-3"] },
        { emoji: "📸", userIds: ["user-4"] },
      ],
    },
    {
      id: "msg-r-2",
      userId: "user-4",
      content: "めちゃくちゃきれい！どこで撮ったんですか？",
      timestamp: ts(9, 35),
    },
    {
      id: "msg-r-3",
      userId: "user-2",
      content: "鎌倉の海岸沿いです。朝早く行くと人が少なくておすすめですよ",
      timestamp: ts(9, 40),
    },
    {
      id: "msg-r-4",
      userId: "user-1",
      content: "おすすめの映画ある人いますか？今週末暇なんですよね 🎬",
      timestamp: ts(10, 0),
    },
    {
      id: "msg-r-5",
      userId: "user-3",
      content: "最近見た「インターステラー」が良かったですよ！何度見ても泣けます",
      timestamp: ts(10, 5),
    },
    {
      id: "msg-r-6",
      userId: "user-4",
      content: "「君の名は。」もおすすめです！",
      timestamp: ts(10, 8),
    },
    {
      id: "msg-r-7",
      userId: "user-1",
      content: "両方チェックしてみます！ありがとう 🙏",
      timestamp: ts(10, 10),
      reactions: [{ emoji: "🎬", userIds: ["user-3", "user-4"] }],
    },
    {
      id: "msg-r-8",
      userId: "user-2",
      content: "今日の社食のメニュー見ました？カレーうどんらしいです 🍛",
      timestamp: ts(11, 0),
    },
    {
      id: "msg-r-9",
      userId: "user-3",
      content: "カレーうどんいいですね！楽しみ",
      timestamp: ts(11, 5),
    },
    {
      id: "msg-r-10",
      userId: "user-1",
      content: "最近ハマっているポッドキャストがあるんですが、誰か聞いてる人いますか？",
      timestamp: ts(14, 0),
    },
    {
      id: "msg-r-11",
      userId: "user-4",
      content: "Tech系のやつですか？Rebuild.fm は面白いですよ",
      timestamp: ts(14, 10),
    },
    {
      id: "msg-r-12",
      userId: "user-1",
      content: "それです！最新エピソード良かったですよね",
      timestamp: ts(14, 15),
    },
  ],

  // ── #engineering ──────────────────────────────────────────
  "room-engineering": [
    {
      id: "msg-e-1",
      userId: "user-1",
      content:
        "React 19の新機能について調べました。Server Componentsがかなり改善されていますね。",
      timestamp: ts(9, 0),
      reactions: [{ emoji: "🚀", userIds: ["user-3"] }],
    },
    {
      id: "msg-e-2",
      userId: "user-3",
      content:
        "use() フックが便利そうですね。Promise を直接渡せるようになったのは大きい。",
      timestamp: ts(9, 10),
    },
    {
      id: "msg-e-3",
      userId: "user-1",
      content:
        "あと、Tailwind CSS v4 への移行も検討したいです。設定がかなりシンプルになりました。",
      timestamp: ts(9, 15),
    },
    {
      id: "msg-e-4",
      userId: "user-3",
      content:
        "v4いいですよね。@import ベースの設定は直感的で好きです。PostCSS不要になったのもポイント高い。",
      timestamp: ts(9, 20),
    },
    {
      id: "msg-e-5",
      userId: "user-4",
      content: "CI/CDパイプラインのビルド時間が長い問題、対応できる人いますか？",
      timestamp: ts(10, 0),
    },
    {
      id: "msg-e-6",
      userId: "user-1",
      content:
        "見てみます。キャッシュの設定を見直せば改善できるかもしれません。",
      timestamp: ts(10, 5),
    },
    {
      id: "msg-e-7",
      userId: "user-3",
      content:
        "Turborepo 導入も検討してみませんか？ビルドキャッシュがかなり効きますよ。",
      timestamp: ts(10, 10),
      reactions: [{ emoji: "💡", userIds: ["user-1", "user-4"] }],
    },
    {
      id: "msg-e-8",
      userId: "user-4",
      content:
        "PR #234 のレビューお願いします。認証周りのリファクタリングです。",
      timestamp: ts(11, 0),
    },
    {
      id: "msg-e-9",
      userId: "user-1",
      content: "午後にレビューします！",
      timestamp: ts(11, 5),
    },
    {
      id: "msg-e-10",
      userId: "user-3",
      content:
        "TypeScript 5.7 のリリースノート読みました。satisfies 演算子の改善が入ってるみたいです。",
      timestamp: ts(14, 0),
    },
    {
      id: "msg-e-11",
      userId: "user-1",
      content:
        "ESLint の flat config への移行、今週中に終わらせたいと思います。",
      timestamp: ts(15, 0),
    },
    {
      id: "msg-e-12",
      userId: "user-4",
      content:
        "テストカバレッジが80%を超えました 🎉 残りはE2Eテストの追加で対応予定です。",
      timestamp: ts(16, 0),
      reactions: [
        { emoji: "🎉", userIds: ["user-1", "user-2", "user-3"] },
      ],
    },
    {
      id: "msg-e-13",
      userId: "user-3",
      content: "素晴らしい！Playwright でE2E書くならヘルプしますよ。",
      timestamp: ts(16, 10),
    },
  ],

  // ── #design ───────────────────────────────────────────────
  "room-design": [
    {
      id: "msg-d-1",
      userId: "user-2",
      content:
        "新しいダッシュボードのデザインカンプを共有します。フィードバックお願いします！",
      timestamp: ts(9, 0),
    },
    {
      id: "msg-d-2",
      userId: "user-4",
      content: "色使いがきれいですね！ダークモードのバリエーションもありますか？",
      timestamp: ts(9, 15),
    },
    {
      id: "msg-d-3",
      userId: "user-2",
      content:
        "ダークモードも作成中です。来週までに仕上げる予定です 🎨",
      timestamp: ts(9, 20),
    },
    {
      id: "msg-d-4",
      userId: "user-1",
      content:
        "レスポンシブ対応について、ブレイクポイントはどうしますか？",
      timestamp: ts(10, 0),
    },
    {
      id: "msg-d-5",
      userId: "user-2",
      content:
        "Tailwind のデフォルト（sm: 640px, md: 768px, lg: 1024px, xl: 1280px）に合わせる予定です。",
      timestamp: ts(10, 5),
    },
    {
      id: "msg-d-6",
      userId: "user-4",
      content:
        "アクセシビリティについても考慮が必要ですね。コントラスト比を確認しましょう。",
      timestamp: ts(11, 0),
      reactions: [{ emoji: "♿", userIds: ["user-1", "user-2"] }],
    },
    {
      id: "msg-d-7",
      userId: "user-2",
      content:
        "WCAG 2.1 AA レベルを目標にしています。コントラストチェッカーで全パターン検証済みです。",
      timestamp: ts(11, 10),
    },
    {
      id: "msg-d-8",
      userId: "user-1",
      content: "アイコンセットは Lucide を使う方向で良いですか？",
      timestamp: ts(13, 0),
    },
    {
      id: "msg-d-9",
      userId: "user-4",
      content:
        "Lucide いいですね。shadcn/ui との相性も良いので賛成です 👍",
      timestamp: ts(13, 5),
      reactions: [{ emoji: "👍", userIds: ["user-1", "user-2"] }],
    },
    {
      id: "msg-d-10",
      userId: "user-2",
      content:
        "デザインシステムのドキュメントを Storybook で管理する案はどうですか？",
      timestamp: ts(14, 0),
    },
    {
      id: "msg-d-11",
      userId: "user-1",
      content:
        "いいと思います！コンポーネントのカタログ化にも役立ちますし。",
      timestamp: ts(14, 10),
    },
  ],

  // ── DM: 佐藤花子 ─────────────────────────────────────────
  "room-dm-hanako": [
    {
      id: "msg-dmh-1",
      userId: "user-2",
      content: "先日の件、進捗どうですか？",
      timestamp: ts(10, 0),
    },
    {
      id: "msg-dmh-2",
      userId: "user-1",
      content:
        "今対応中です。午後には共有できると思います。",
      timestamp: ts(10, 5),
    },
    {
      id: "msg-dmh-3",
      userId: "user-2",
      content: "ありがとうございます！急ぎではないので大丈夫ですよ 😊",
      timestamp: ts(10, 8),
    },
    {
      id: "msg-dmh-4",
      userId: "user-1",
      content: "了解です。完成したらDMしますね。",
      timestamp: ts(10, 10),
    },
    {
      id: "msg-dmh-5",
      userId: "user-2",
      content: "あと、来週の金曜日の懇親会の出欠確認もお願いします！",
      timestamp: ts(11, 0),
    },
    {
      id: "msg-dmh-6",
      userId: "user-1",
      content: "参加します！場所はいつもの所ですか？",
      timestamp: ts(11, 5),
    },
    {
      id: "msg-dmh-7",
      userId: "user-2",
      content: "今回は渋谷の新しいお店を予約しています 🍻",
      timestamp: ts(11, 10),
    },
    {
      id: "msg-dmh-8",
      userId: "user-1",
      content: "楽しみにしてます！",
      timestamp: ts(11, 15),
      reactions: [{ emoji: "🎉", userIds: ["user-2"] }],
    },
    {
      id: "msg-dmh-9",
      userId: "user-2",
      content:
        "資料のレビューありがとうございました！修正版を送りましたので確認お願いします。",
      timestamp: ts(14, 0),
    },
    {
      id: "msg-dmh-10",
      userId: "user-1",
      content: "確認しました。LGTMです！ 👍",
      timestamp: ts(14, 30),
    },
  ],

  // ── DM: 鈴木一郎 ─────────────────────────────────────────
  "room-dm-ichiro": [
    {
      id: "msg-dmi-1",
      userId: "user-3",
      content:
        "コードレビューの件でちょっと相談があるのですが、時間ありますか？",
      timestamp: ts(9, 0),
    },
    {
      id: "msg-dmi-2",
      userId: "user-1",
      content: "もちろん！何でしょう？",
      timestamp: ts(9, 5),
    },
    {
      id: "msg-dmi-3",
      userId: "user-3",
      content:
        "認証モジュールのリファクタリングでJWTの扱い方について意見を聞きたくて。refresh tokenのローテーション戦略ってどうしてますか？",
      timestamp: ts(9, 10),
    },
    {
      id: "msg-dmi-4",
      userId: "user-1",
      content:
        "うちではaccess token 15分、refresh token 7日で設定しています。refresh token使用時に新しいペアを発行するローテーション方式です。",
      timestamp: ts(9, 15),
    },
    {
      id: "msg-dmi-5",
      userId: "user-3",
      content:
        "なるほど。その方式だとトークンの無効化はどう管理してますか？ブラックリスト？",
      timestamp: ts(9, 20),
    },
    {
      id: "msg-dmi-6",
      userId: "user-1",
      content:
        "Redisにrefresh tokenファミリーのIDを保存して、再利用検知したらファミリーごと無効化しています。",
      timestamp: ts(9, 25),
    },
    {
      id: "msg-dmi-7",
      userId: "user-3",
      content: "参考になります！ドキュメントにまとめてもらえると助かります 🙏",
      timestamp: ts(9, 30),
    },
    {
      id: "msg-dmi-8",
      userId: "user-1",
      content: "了解です。今週中にConfluenceに書きますね。",
      timestamp: ts(9, 35),
    },
    {
      id: "msg-dmi-9",
      userId: "user-3",
      content: "ありがとうございます！あと、金曜のペアプロの時間確認したいです。",
      timestamp: ts(10, 0),
    },
    {
      id: "msg-dmi-10",
      userId: "user-1",
      content: "14時〜16時でどうですか？",
      timestamp: ts(10, 5),
    },
    {
      id: "msg-dmi-11",
      userId: "user-3",
      content: "OKです！よろしくお願いします 💪",
      timestamp: ts(10, 10),
    },
  ],
};

// ============================================================
// サンプルスレッド（2個）
// ============================================================

// スレッド1: #general の「スタンドアップ10時から」に対するスレッド
export const mockThread1: Thread = {
  id: "thread-1",
  parentMessageId: "msg-g-4",
  messages: [
    {
      id: "msg-g-4",
      userId: "user-1",
      content: "はい、10時からです。会議室Bで行います。",
      timestamp: ts(9, 6),
    },
    {
      id: "msg-t1-1",
      userId: "user-3",
      content: "会議室Bですね、了解です。アジェンダは共有されてますか？",
      timestamp: ts(9, 7),
    },
    {
      id: "msg-t1-2",
      userId: "user-1",
      content:
        "Notionにアップしてあります。各チームの進捗報告がメインです。",
      timestamp: ts(9, 8),
    },
    {
      id: "msg-t1-3",
      userId: "user-4",
      content: "確認しました。デザインチームからの共有事項もあります。",
      timestamp: ts(9, 12),
    },
    {
      id: "msg-t1-4",
      userId: "user-2",
      content: "ありがとうございます。それでは10時に会議室Bで集合ですね 👋",
      timestamp: ts(9, 15),
    },
  ],
  participantIds: ["user-1", "user-2", "user-3", "user-4"],
};

// スレッド2: #general の「リリースノートのドラフト」に対するスレッド
export const mockThread2: Thread = {
  id: "thread-2",
  parentMessageId: "msg-g-11",
  messages: [
    {
      id: "msg-g-11",
      userId: "user-1",
      content:
        "リリースノートのドラフトを作成しました。レビューお願いします！",
      timestamp: ts(15, 0),
    },
    {
      id: "msg-t2-1",
      userId: "user-2",
      content:
        "確認しました。UIの変更点セクションにスクリーンショットを追加したほうが良さそうです。",
      timestamp: ts(15, 10),
    },
    {
      id: "msg-t2-2",
      userId: "user-3",
      content:
        "APIの破壊的変更についてもう少し詳しく書いたほうが良いかもしれません。マイグレーションガイドへのリンクも追加しましょう。",
      timestamp: ts(15, 20),
    },
    {
      id: "msg-t2-3",
      userId: "user-1",
      content: "フィードバックありがとうございます！修正版を今日中に共有します。",
      timestamp: ts(15, 30),
    },
  ],
  participantIds: ["user-1", "user-2", "user-3"],
};

// スレッドをまとめたマップ（スレッドID → Thread）
export const mockThreads: Record<string, Thread> = {
  "thread-1": mockThread1,
  "thread-2": mockThread2,
};

// ============================================================
// ChatState の初期データとしてエクスポート
// ============================================================
export const mockInitialState = {
  rooms: mockRooms,
  activeRoomId: "room-general",
  messages: mockMessages,
} as const;
