async function noteExists(req, res, next) {
    const {id} = req.params;
    res.locals.notes = "found it"
    next();
}
// API requests

// list out all notes
function list(req, res) {
  console.log("hello");
  res.status(200).json("hello");
}

// read one note
async function read(req, res) {
    res.status(200).json(res.locals.notes + req.params.id)
}
module.exports = {
  list: list,
  read: [noteExists, read]
};
