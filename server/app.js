const express = require("express");
const cors = require("cors");

const notesRouter = require("./Notes/notes.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler")

const app = express();

app.use(cors());

app.use("/notes/", notesRouter);

app.use(notFound);
app.use(errorHandler)

module.exports = app;
