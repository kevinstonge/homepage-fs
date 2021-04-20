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
      const project_id = await db("projects")
        .transacting(trx)
        .insert(newProject);
      if (skills.length > 0) {
        const skillsArray = skills.map((skill) => ({
          project_id,
          skill_id: skill,
        }));
        await db("projects-skills").transacting(trx).insert(skillsArray);
      }
      return project_id;
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const listProjects = async () => {
  try {
    const results = await db('projects').join("projects-skills", 'projects-skills.project_id', "=", 'projects.id');
    const reducedResults = results.reduce((memo, project) => {
      if (!memo.skills) {
        memo.skills = []
      }
      memo.skills.push(project.skill_id);
      return memo;
    }, {});
    return results;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
  /*
  use reduce on the joined results:
  .then(results => {
            return results.reduce((memo, categoryEntry) => {
                if (!memo.title){
                    memo.title = categoryEntry.title;
                }
                if (!memo.categories) {
                    memo.categories = [];
                }
                memo.categories.push(categoryEntry.category_title);
                return memo;
            }, {});
}
  */
  
};
const updateProject = async (id, projectObject) => {
  return await db("projects").where({ id }).update(projectObject);
};
const deleteProject = async (id) => {
  return await db("projects").where({ id }).del();
};
module.exports = { addProject, listProjects, updateProject, deleteProject };
