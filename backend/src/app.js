import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import router from "./notes/notes.router.js";
import notFound from "./errors/notFound.js";
import errorHandler from "./errors/errorHandler.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/notes/", router);

app.use(notFound);
app.use(errorHandler);

export default app;

// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { db } from "./server.js";
// import { notes } from "./db/schema.js";

// import router from "./notes/notes.router.js";
// import notFound from "./errors/notFound.js";
// import errorHandler from "./errors/errorHandler.js";

// export const app = express();

// app.use(bodyParser.json());

// app.use(cors());


// app.use("/notes/", router);

// app.use(notFound);
// app.use(errorHandler);
