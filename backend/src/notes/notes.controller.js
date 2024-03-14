const notesService = require("./notes.service");

async function noteExists(req, res, next) {
  const { id } = req.params;
  const note = "retrieve a single item from database";
  if (!note)
    next({
      status: 404,
      message: `Note ${reservation_id} doesn't exist, sorry`,
    });

  res.locals.notes = `note ${req.params.id} exists`;
  next();
}

async function hasValidProperties(req, res, next) {
  // valid properties
  const validProperties = ["note", "category"];
  // check if empty
  const { data = {} } = req.body;
  if (!req.body.data) {
    return next({ status: 400, message: `no data` });
  }

  // chcek if contains all required parts;
  validProperties.forEach((property) => {
    if (!data[property]) next({ status: 400, message: `missing property` });
  });

  next();
}
// API requests --------------------------------

// list out all notes
async function list(req, res) {
  const data = await notesService.list();
  res.status(200).json({ data });
}

// read one note
async function read(req, res) {
  res.status(200).json({ data: res.locals.notes});
}

async function create(req, res, next) {
  const { data } = req.body;
  console.log(data);
  res.status(201).json({ data });
}

module.exports = {
  list: list,
  read: [noteExists, read],
  create: [hasValidProperties, create],
};
