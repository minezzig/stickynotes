import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from "./server.js";
import {notes} from "./db/schema.js"

import router from "./notes/notes.router.js";
import notFound from "./errors/notFound.js";
import errorHandler from "./errors/errorHandler.js";

// const notFound = require("./errors/notFound");
// const errorHandler = require("./errors/errorHandler");

export const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', async (req, res) => {
//     const data = await db.select().from(notes);
//     res.send(data)
//   })
app.use("/notes/", router);

app.use(notFound);
app.use(errorHandler);

// module.exports = app;
