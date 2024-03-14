const { db } = require("../server");
const { notes } = require("../db/schema");

async function list() {
  //const data = await db.query.notes.findMany();
  const data = "service"
  console.log("data:", data);
  return { data };
}

module.exports = {
  list,
};
