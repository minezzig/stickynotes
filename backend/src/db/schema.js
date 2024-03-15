import {
  boolean,
  timestamp,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 256 }),
  text: varchar("text", { length: 256 }),
  completed: boolean("completed").default(false),
  isEditing: boolean("is_editing").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
