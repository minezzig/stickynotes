// const router = require("express").Router();
// const notesController = require("./notes.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");
import express from "express";
import * as notesController from "./notes.controller.js";
import methodNotAllowed from "../errors/methodNotAllowed.js";

const router = express.Router();

router
  .route("/")
  .get(notesController.list)
  .post(notesController.createMiddleware)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(notesController.readMiddleware)
  .patch(notesController.patchMiddleware)
  .put(notesController.updateMiddleware)
  .delete(notesController.deleteMiddleware)
  .all(methodNotAllowed);

//module.exports = router;
export default router;
