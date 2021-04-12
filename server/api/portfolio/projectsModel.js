const db = require("../../data/dbConfig.js");

const addProject = async (projectObject) => {
  return await db("projects").insert(projectObject);
};
const listProjects = async () => {
  return await db("projects");
};
const updateProject = async (id, projectObject) => {
  return await db("projects").where({ id }).update(projectObject);
};
const deleteProject = async (id) => {
  return await db("projects").where({ id }).del();
};
module.exports = { addProject, listProjects, updateProject, deleteProject };
