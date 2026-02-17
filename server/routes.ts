import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.messages.list.path, async (req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.get(api.messages.get.path, async (req, res) => {
    const message = await storage.getMessageByPage(Number(req.params.pageNumber));
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  });

  // Initialize seed data
  await seedDatabase();

  return httpServer;
}

// Seed function to be called in index.ts or manually
export async function seedDatabase() {
  const existing = await storage.getMessages();
  if (existing.length === 0) {
    await storage.createMessage({
      pageNumber: 1,
      text: "get well soon my sweet baby",
      animationType: "hearts"
    });
    await storage.createMessage({
      pageNumber: 2,
      text: "since you've been sick",
      emoji: "😢",
      animationType: "stopwatch"
    });
    await storage.createMessage({
      pageNumber: 3,
      text: "you can do this\ni am with you every step of the way",
      emoji: "👊❤️",
      animationType: "support"
    });
    await storage.createMessage({
      pageNumber: 4,
      text: "i love you forever dil",
      animationType: "love"
    });
  }
}
