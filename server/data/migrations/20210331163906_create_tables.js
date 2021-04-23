const knex = require("knex");

exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (projects) => {
      projects.increments();
      projects.text("title", 64).notNullable();
      projects.text("description");
      projects.text("image");
      projects.text("github");
      projects.text("url").notNullable();
      projects.integer("rank");
    })
    .createTable("skills", (skills) => {
      skills.increments();
      skills.text("long_name").notNullable();
      skills.text("short_name");
      skills.text("logo");
      skills.integer("proficiency");
    })
    .createTable("projects-skills", (bridge) => {
      bridge.integer("project_id").unsigned();
      bridge
        .foreign("project_id")
        .onDelete("CASCADE")
        .references("id")
        .inTable("projects");
      bridge.integer("skill_id").unsigned();
      bridge
        .foreign("skill_id")
        .onDelete("CASCADE")
        .references("id")
        .inTable("skills");
    })
    .createTable("admin", (admin) => {
      admin.increments();
      admin.text("username", 32).notNullable();
      admin.text("password").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects-skills")
    .dropTableIfExists("skills")
    .dropTableIfExists("projects")
    .dropTableIfExists("admin");
};
