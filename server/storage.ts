import { db } from "./db";
import { messages, type Message, type InsertMessage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  getMessageByPage(pageNumber: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getMessages(): Promise<Message[]> {
    return await db!.select().from(messages).orderBy(messages.pageNumber);
  }

  async getMessageByPage(pageNumber: number): Promise<Message | undefined> {
    const [message] = await db!.select().from(messages).where(eq(messages.pageNumber, pageNumber));
    return message;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db!.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export class MemoryStorage implements IStorage {
  private messages: Message[] = [];
  private nextId = 1;

  async getMessages(): Promise<Message[]> {
    return [...this.messages].sort((a, b) => a.pageNumber - b.pageNumber);
  }

  async getMessageByPage(pageNumber: number): Promise<Message | undefined> {
    return this.messages.find((m) => m.pageNumber === pageNumber);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.nextId++,
      pageNumber: insertMessage.pageNumber,
      text: insertMessage.text,
      emoji: insertMessage.emoji ?? null,
      animationType: insertMessage.animationType ?? null,
    };
    this.messages.push(message);
    return message;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
