// const { db } = require("../server");
// const { notes } = require("../db/schema");
import { db } from "../server.js";
import { notes } from "../db/schema.js";
import { eq } from "drizzle-orm";

// get all notes from database in id order
async function list() {
  return await db.select().from(notes).orderBy(notes.id);
}

// get one note depending on id
async function read(id) {
  return await db.select().from(notes).where(eq(notes.id, id));
}
// create a new note
async function create(newNote) {
  return await db
    .insert(notes)
    .values({
      category: newNote.category,
      text: newNote.text,
    })
    .returning();
}

// delete a note
async function destroy(id) {
  await db.delete(notes).where(eq(notes.id, id)).returning();
}

//update the completed status
async function updateCompleted(id, completed) {
  return db
    .update(notes)
    .set({ completed: completed })
    .where(eq(notes.id, id))
    .returning();
}

// update the body/category of the note
async function update(id, editedNote) {
  return db
    .update(notes)
    .set({ category: editedNote.category, text: editedNote.text })
    .where(eq(notes.id, id))
    .returning();
}

export {
  list,
  read,
  destroy,
  create,
  update,
  updateCompleted,
};
