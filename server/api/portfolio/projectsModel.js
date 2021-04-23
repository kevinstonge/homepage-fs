const { json } = require("express");
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
          const skillsArray = [...new Set(skills)].map((skill) => ({
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
    const projects = await db('projects').join("projects-skills", 'projects-skills.project_id', "=", 'projects.id');
    const reducedProjects = projects.reduce((memo, project) => {
      const p = `project${project.id}`;
      if (!memo[p]) {
          memo[p] = { ...project };
          delete memo[p].skill_id;
          delete memo[p].project_id;
      }
      if (!memo[p].skills) {
          memo[p].skills = [];
      }
      memo[p].skills.push(project.skill_id);
      return memo;
    }, {});
    const projectsArray = Object.keys(reducedProjects).map(key => reducedProjects[key]);
    return projectsArray;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
  
};
const updateProject = async (id, projectObject) => {
  try {
    if (projectObject.skills && projectObject.skills.length > 0) {
      projectObject.skills = JSON.parse(projectObject.skills);
      const existingEntries = await db('projects-skills').pluck('skill_id').where('project_id', '=', id);
      const skillsToDelete = existingEntries.filter(s => { if (!projectObject.skills.includes(s)) { return s } });
      const skillsToAdd = projectObject.skills.filter(s => { if (!existingEntries.includes(s)) { return s } });
      if (skillsToDelete.length > 0) {
        await db('projects-skills').whereIn('skill_id', skillsToDelete).andWhere('project_id', '=', id).delete();
      }
      if (skillsToAdd.length > 0) {
        const addSkillsArray = [...new Set(skillsToAdd)].map((skill) => ({
          project_id: id,
          skill_id: skill,
        }));
        await db("projects-skills").insert(addSkillsArray);
      }
      delete projectObject.skills;
    }

    if (projectObject.rank) {
      const reRank = await db.transaction(async (trx) => {
        const oldProjectObject = await db('projects').transacting(trx).where({ id });
        const oldRank = oldProjectObject[0].rank;
        await db('projects').transacting(trx).where({ id }).update({ rank: projectObject.rank });
        await db('projects').transacting(trx)
          .whereNot('id', '=', id)
          .andWhere('rank', '>=', projectObject.rank)
          .andWhere('rank', '<', oldRank)
          .increment('rank', 1);
        return true;
      });
      if (reRank) {
        delete projectObject.rank;
      }
      else {
        res.status(500).json({message: "error changing the ranking of the projects"})
      }
    }

    if (Object.keys(projectObject).length > 0) {
      return await db("projects").where({ id }).update(projectObject);
    }
    else {
      return await db('projects').where({ id });
    }
    
  }
  catch (err) {
    console.log(err);
    throw err;
  }
};
const deleteProject = async (id) => {
    return await db("projects").where({ id }).del();
};
module.exports = { addProject, listProjects, updateProject, deleteProject };
