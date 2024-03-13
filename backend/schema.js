const {
  integer,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} = require("drizzle-orm/pg-core");

const notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    note: varchar("note", { length: 256 }),
    category: varchar("category", { length: 256 }),
  },
  (notes) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(notes.note),
    };
  }
);

module.exports = { notes: notes };
