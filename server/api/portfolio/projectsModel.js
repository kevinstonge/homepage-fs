const db = require("../../data/dbConfig.js");
const addProject = async (projectObject, skills) => {
  try {
    const existingProjects = await db("projects").orderBy("rank", "desc");
    let rank = 1;
    if (existingProjects.length > 0) {
      rank = existingProjects[0].rank + 1;
    }
    const newProject = { ...projectObject, rank };
    db.transaction((trx) => {
      db("projects")
        .transacting(trx)
        .insert(newProject)
        .then(async (resp) => {
          const project_id = resp[0];
          if (!skills || skills.length === 0) {
            return trx;
          }
          const skillsArray = skills.map((skill) => ({
            project_id,
            skill_id: skill,
          }));
          console.log("23");
          db("projects-skills").transacting(trx).insert(skillsArray);
        })
        .then(() => {
          trx.commit;
        })
        .catch(trx.rollback);
    });
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
