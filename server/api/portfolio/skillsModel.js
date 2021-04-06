const db = require("../../data/dbConfig.js");

const addSkill = async (skillObject) => {
  return await db("skills").insert(skillObject).returning("id");
};
const listSkills = async () => {
  return await db("skills");
};
module.exports = { addSkill, listSkills };
