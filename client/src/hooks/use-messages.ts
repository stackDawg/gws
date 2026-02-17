import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Define default messages in case backend is empty or offline
// This ensures the specific requested content is always available
const DEFAULT_MESSAGES = [
  { id: 1, pageNumber: 1, text: "Get well soon my sweet baby", emoji: "💖", animationType: "hearts" },
  { id: 2, pageNumber: 2, text: "Since you've been sick", emoji: "😢", animationType: "crying" },
  { id: 3, pageNumber: 3, text: "You can do this! I am with you every step of the way", emoji: "✊❤️", animationType: "fist" },
  { id: 4, pageNumber: 4, text: "I love you forever dil", emoji: "💑", animationType: "love" },
];

export function useMessages() {
  return useQuery({
    queryKey: [api.messages.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.messages.list.path);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        
        // Parse with Zod, but fallback to defaults if empty array
        const parsed = api.messages.list.responses[200].parse(data);
        return parsed.length > 0 ? parsed : DEFAULT_MESSAGES;
      } catch (error) {
        console.warn("Using default messages due to API error:", error);
        return DEFAULT_MESSAGES;
      }
    },
  });
}

export function useMessage(pageNumber: number) {
  return useQuery({
    queryKey: [api.messages.get.path, pageNumber],
    queryFn: async () => {
      const url = buildUrl(api.messages.get.path, { pageNumber });
      const res = await fetch(url);
      
      if (!res.ok) {
        // Fallback for individual message
        return DEFAULT_MESSAGES.find(m => m.pageNumber === pageNumber) || null;
      }
      
      return api.messages.get.responses[200].parse(await res.json());
    },
  });
}
