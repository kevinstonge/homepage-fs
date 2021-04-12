const { request } = require("express");
const db = require("../../data/dbConfig.js");

const addSkill = async (skillObject) => {
  return await db("skills").insert(skillObject);
};
const listSkills = async () => {
  return await db("skills");
};
const updateSkill = async (id, skillObject) => {
  return await db("skills").where({ id }).update(skillObject);
};
module.exports = { addSkill, listSkills, updateSkill };
