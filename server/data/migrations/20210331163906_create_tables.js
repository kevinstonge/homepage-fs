const knex = require('knex');

exports.up = function(knex) {
    return knex.schema
        .createTable("projects", (projects) => {
            projects.increments();
            projects.text("title", 64).notNullable();
            projects.text("description");
            projects.blob("image");
            projects.text("github");
            projects.text("url");
        })
        .createTable("skills", (skills) => {
            skills.increments();
            skills.text("long_name").notNullable();
            skills.text("short_name");
            skills.blob("logo");
            skills.integer("proficiency");
        })
        .createTable("projects-skills", (bridge) => {
            bridge.integer("project_id").references("id").inTable("projects").onDelete("cascade").notNullable();
            bridge.integer("skill_id").references("id").inTable("skills").onDelete("cascade").notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("projects-skills")
        .dropTableIfExists("skills")
        .dropTableIfExists("projects");
};
