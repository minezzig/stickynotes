require('dotenv').config();
const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const schema = require("./schema");

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
const db = drizzle(sql, { schema });

//const {PORT = 4000} = process.env;
const PORT = 4000;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Yay it works!`);
});

module.exports = db;
