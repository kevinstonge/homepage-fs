const db = require("../../data/dbConfig.js");

const addProject = async (projectObject) => {
  //need to determine rank of newly created project
  try {
    const existingProjects = await db("projects").orderBy("rank", "desc");
    let rank = 1;
    if (existingProjects.length > 0) {
      rank = existingProjects[0].rank + 1;
    }
    const newProject = { ...projectObject, rank };
    return await db("projects").insert(newProject);
  } catch (err) {
    throw err;
  }
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
