const db = require("../../data/dbConfig.js");
const addProject = async (projectObject, skills) => {
  try {
    const existingProjects = await db("projects").orderBy("rank", "desc");
    let rank = 1;
    if (existingProjects.length > 0) {
      rank = existingProjects[0].rank + 1;
    }
    const newProject = { ...projectObject, rank };
    const result = await db.transaction(async (trx) => {
      const id = await db("projects")
        .transacting(trx)
        .insert(newProject);
      if (skills.length > 0) {
        const skillsArray = skills.map((skill) => ({
          project_id,
          skill_id: skill,
        }));
        await db("projects-skills").transacting(trx).insert(skillsArray);
      }
      return id;
    });
    return result;
  } catch (err) {
    console.log(err);
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
