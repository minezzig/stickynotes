// const { db } = require("../server");
// const { notes } = require("../db/schema");
import { db } from "../server.js";
import { notes } from "../db/schema.js";
import { eq } from "drizzle-orm";

async function list() {
  return await db.select().from(notes);
}

async function read(id) {
  return await db.select().from(notes).where(eq(notes.id, id));
}
async function create(newNote) {
  return await db
    .insert(notes)
    .values({
      category: newNote.category,
      note: newNote.note,
    })
    .returning();
}

async function destroy(id) {
  await db.delete(notes).where(eq(notes.id, id)).returning();
}

async function updateStatusCompleted(id, completed) {
  return db
    .update(notes)
    .set({ completed: completed })
    .where(eq(notes.id, id))
    .returning();
}

async function updateStatusIsEditing(id, isEditing) {
  return db
    .update(notes)
    .set({ isEditing: isEditing })
    .where(eq(notes.id, id))
    .returning();
}

async function update(id, editedNote) {
  return db
    .update(notes)
    .set({ category: editedNote.category, note: editedNote.note })
    .where(eq(notes.id, id))
    .returning();
}

// module.exports = {
//   list,
// };
export {
  list,
  read,
  destroy,
  create,
  update,
  updateStatusCompleted,
  updateStatusIsEditing,
};
