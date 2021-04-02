exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("admin")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("admin").insert([
        {
          username: "kevinstonge",
          password:
            "$2a$10$J2.9K4gFZRSXWqk9VHo5e.vymwj/HD5w8Hg5Y/Wock3XvzuqFrOx.",
        },
      ]);
    });
};
