import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import app from "./app.js";
import "dotenv/config";

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
const db = drizzle(sql);

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Yay it works!`);
});

export default db;

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

