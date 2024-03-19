//const notesService = require("./notes.service");
import * as notesService from "./notes.service.js";

async function noteExists(req, res, next) {
  const { id } = req.params;
  const note = await notesService.read(id);

  if (!note.length)
    next({
      status: 404,
      message: `Note ${id} doesn't exist, sorry`,
    });

  res.locals.note = note;
  next();
}

async function hasValidProperties(req, res, next) {
  // valid properties
  const validProperties = ["category", "text"];

  const validCategories = ["work", "personal", "appointment"];
  // check if empty
  const { data = {} } = req.body;
  if (!req.body.data) {
    return next({ status: 400, message: `no data` });
  }
  // chcek if contains all required parts;
  validProperties.forEach((property) => {
    if (!data[property])
      next({ status: 400, message: `missing property: ${property}` });
  });
  // check if category is one of the optional fields
  if (!validCategories.includes(data.category)) {
    next({ status: 400, message: "category no acceptable" });
  }
  next();
}

async function hasValidCompletedProperties(req, res, next) {
  const { data = {} } = req.body;
  const { completed } = data;

  // check if there was data in body
  if (!req.body.data) {
    return next({ status: 400, message: "no data" });
  }
  // check to see if it has a "completed" field
  if (completed === undefined) {
    return next({ status: 400, message: "must include 'completed' field" });
  }

  // check to see if the input is a boolean
  if (typeof data.completed !== "boolean") {
    return next({
      status: 400,
      message: "completed value must be true or false",
    });
  }

  next();
}
// --------------------API requests --------------------------------

// list out all notes
async function list(req, res) {
  const data = await notesService.list();
  res.status(200).json({ data });
}

// read one note
async function read(req, res) {
  res.status(200).json({ data: res.locals.note });
}
// create a new note
async function create(req, res, next) {
  const newNote = req.body.data;
  const data = await notesService.create(newNote);
  res.status(201).json({ data });
}

// edit the contents of a note (either the note[body] or category)
async function update(req, res, next) {
  const { id } = req.params;
  const editedNote = req.body.data;
  const updatedNote = await notesService.update(id, editedNote);
  res.status(200).json({ data: updatedNote });
}

// update either the completed or isEditing field
async function updateStatus(req, res, next) {
  const { id } = req.params;
  const { data } = req.body;
  let updatedStatus;
  if (data.hasOwnProperty("completed")) {
    updatedStatus = await notesService.updateCompleted(id, data.completed);
  }

  res.status(200).json({ data: updatedStatus });
}

// delete a note
async function destroy(req, res, next) {
  const { id } = req.params;
  await notesService.destroy(id);
  res.status(204).end();
}

export { list };
export const readMiddleware = [noteExists, read];
export const createMiddleware = [hasValidProperties, create];
export const updateMiddleware = [noteExists, hasValidProperties, update];
export const patchMiddleware = [
  noteExists,
  hasValidCompletedProperties,
  updateStatus,
];
export const deleteMiddleware = [noteExists, destroy];
