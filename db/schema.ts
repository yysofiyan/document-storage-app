import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
