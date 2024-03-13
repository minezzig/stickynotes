const router = require("express").Router();
const notesController = require("./notes.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(notesController.list)
  .all(methodNotAllowed);

  router.route("/:id").get(notesController.read);

module.exports = router;
