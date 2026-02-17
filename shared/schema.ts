import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  pageNumber: integer("page_number").notNull(),
  text: text("text").notNull(),
  emoji: text("emoji"),
  animationType: text("animation_type"), // e.g., 'hearts', 'crying', 'fist', 'none'
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true });

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
