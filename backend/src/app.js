// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';


import { db } from "./server.js";
import {notes} from "./db/schema.js"

// const bodyParser = require('body-parser');

// const notesRouter = require("./notes/notes.router");
// const notFound = require("./errors/notFound");
// const errorHandler = require("./errors/errorHandler");

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    const data = await db.select().from(notes);
    res.send(data)
  })
//app.use("/notes/", notesRouter);

//app.use(notFound);
//app.use(errorHandler);

// module.exports = app;
