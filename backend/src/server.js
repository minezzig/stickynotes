import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

import router from "./notes/notes.router.js";
import notFound from "./errors/notFound.js";
import errorHandler from "./errors/errorHandler.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialize Neon database connection and export for use in notes.service
const sql = neon(process.env.DRIZZLE_DATABASE_URL);
const db = drizzle(sql);

app.use("/notes/", router);

app.use(notFound);
app.use(errorHandler);

// set up express zpp;
const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Yay it works!`);
});

export { db }; // Export db as a named export

export default app; // Export app as the default export



//  import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import {app} from "./app.js";
// import "dotenv/config";
// import { notes } from "./db/schema.js";

// const sql = neon(process.env.DRIZZLE_DATABASE_URL);
// export const db = drizzle(sql);

// const { PORT = 4000 } = process.env;

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}. Yay it works!`);
// });
