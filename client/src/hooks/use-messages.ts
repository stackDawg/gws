export interface Message {
  id: number;
  pageNumber: number;
  text: string;
  emoji: string | null;
  animationType: string | null;
}

const MESSAGES: Message[] = [
  { id: 1, pageNumber: 1, text: "Get well soon my sweet baby", emoji: "💖", animationType: "hearts" },
  { id: 2, pageNumber: 2, text: "Since you've been sick", emoji: "😢", animationType: "crying" },
  { id: 3, pageNumber: 3, text: "You can do this! I am with you every step of the way", emoji: "✊❤️", animationType: "fist" },
  { id: 4, pageNumber: 4, text: "I love you forever dil", emoji: "💑", animationType: "love" },
];

export function useMessages() {
  return { data: MESSAGES, isLoading: false };
}

export function useMessage(pageNumber: number) {
  return {
    data: MESSAGES.find((m) => m.pageNumber === pageNumber) ?? null,
    isLoading: false,
  };
}
