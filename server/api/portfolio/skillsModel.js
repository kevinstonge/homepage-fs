const db = require("../../data/dbConfig.js");

const addSkill = async (skillObject) => {
    return await db('skills').insert(skillObject).returning('id');
}

module.exports = { addSkill }