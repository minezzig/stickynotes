import schema from "./schema.js";

export default {
  schema: "./schema.js",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL
  },
}

