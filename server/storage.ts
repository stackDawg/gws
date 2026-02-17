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
    return await db.select().from(messages).orderBy(messages.pageNumber);
  }

  async getMessageByPage(pageNumber: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.pageNumber, pageNumber));
    return message;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
