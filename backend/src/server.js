import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import {app} from "./app.js";
import 'dotenv/config';
import {notes} from "./db/schema.js"

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql);

// const result = async () => {
//   const data = await db.select().from(notes);
//   console.log(data)
// }
  // result();
//const {PORT = 4000} = process.env;
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Yay it works!`);

});

