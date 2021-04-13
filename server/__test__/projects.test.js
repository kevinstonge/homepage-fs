require("dotenv").config();
const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const path = require("path");
let goodCookie = "";
beforeAll(async () => {
  const loginRequest = await request(server)
    .post("/admin/login")
    .send({ username: "kevinstonge", password: process.env.pw });
  if (loginRequest.header["set-cookie"]) {
    goodCookie = loginRequest.header["set-cookie"];
  }
  await db("projects-skills").truncate();
  await db("skills").truncate();
  await db("projects").truncate();
});
/*
BEHAVIOR
project ranking:
projects will have unique rank - when rank of one is changed, each lower-ranked project must be moved down a rank (rank++) until the rank value of the changed project is reached, this must be done as a 'transaction'. 
on the frontend, rank will be drag and drop, position based

skills-project bridge:
bridge table between project_id and skill_id - need to query this table for each project, add skill_id list to project json for each project. 

//projects table columns: title, description, image, github, url, rank
*/
describe("GET requests to /api/portfolio/projects", () => {
  it("should respond with full list of projects", async () => {
    const result = await request(server).get("/api/portfolio/projects");
    expect(result.body.projects.length).toBe(0);
    expect(result.body.skills.length).toBe(0);
  });
});

describe("POST requests to /api/portfolio/projects with bad input", () => {
  it("should respond with 400 if incomplete data is provided", async () => {
    const result = await request(server)
      .post("/api/portfolio/projects")
      .set("Cookie", goodCookie)
      .send({ github: "http://www.github.com/mockURL" });
    expect(result.status).toBe(400);
  });
});

describe("POST requests to /api/portfolio/projects with NO image provided", () => {
  it("should respond with the new project", async () => {
    const result = await request(server)
      .post("/api/portfolio/projects")
      .set("Cookie", goodCookie)
      .send({
        title: "Sample project",
        url: "http://www.sampleproject.com/mockURL",
        description: "sample project - not real",
      });
    expect(result.body.addedProject.length).toBe(1);
  });
});

describe("POST requests to /api/portfolio/projects with image attachment", () => {
  it("should respond with 201", async () => {
    try {
      const result = await request(server)
        .post("/api/portfolio/projects")
        .set("Cookie", goodCookie)
        .field("title", "sample project 2")
        .field("description", "sample project 2 - also not real")
        .field("url", "http://www.sampleproject2.com")
        .attach("image", path.join(__dirname, "../images/test.png"));
      expect(result.status).toBe(201);
      expect(result.body.addedProject.length).toBe(1);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});

describe("GET requests to /api/portfolio/projects", () => {
  it("should respond with full list of projects", async () => {
    const result = await request(server).get("/api/portfolio/projects");
    expect(result.body.projects.length).toBe(2);
    expect(result.body.projects[0].title).toBe("Sample project");
    expect(result.body.projects[1].image).toBe("image-test.png");
  });
});

// describe("PUT requests to /api/portfolio/skills/:id for an id that doesn't exist", () => {
//   it("should respond with status 404", async () => {
//     const result = await request(server)
//       .put("/api/portfolio/skills/7")
//       .set("Cookie", goodCookie);
//     expect(result.status).toBe(404);
//   });
// });

// describe("PUT requests to /api/portfolio/skills/:id with no data", () => {
//   it("should respond with status 400", async () => {
//     const result = await request(server)
//       .put("/api/portfolio/skills/1")
//       .set("Cookie", goodCookie);
//     expect(result.status).toBe(400);
//   });
// });

// describe("PUT requests to /api/portfolio/skills/:id with one value changed", () => {
//   it("should respond with status 200 and the updated data should be returned on a subsequent GET request", async () => {
//     const result = await request(server)
//       .put("/api/portfolio/skills/1")
//       .set("Cookie", goodCookie)
//       .field("proficiency", 1);
//     console.log(result.body.message);
//     expect(result.status).toBe(200);
//     const newSkills = await request(server).get("/api/portfolio/skills");
//     expect(newSkills.body.skills[0].proficiency).toBe(1);
//   });
// });

// describe("PUT requests to /api/portfolio/skills/:id with image plus one value changed", () => {
//   it("should respond with status 200", async () => {
//     const result = await request(server)
//       .put("/api/portfolio/skills/1")
//       .set("Cookie", goodCookie)
//       .field("proficiency", 3)
//       .attach("logo", path.join(__dirname, "../images/test2.png"));
//     expect(result.status).toBe(200);
//   });
// });

// describe("DELETE requests to /api/portfolio/skills/:id", () => {
//   it("should respond with status 200, subsequent GET request should not contain deleted item", async () => {
//     const result = await request(server)
//       .delete("/api/portfolio/skills/1")
//       .set("Cookie", goodCookie);
//     expect(result.status).toBe(200);
//     const newSkills = await request(server).get("/api/portfolio/skills");
//     expect(newSkills.body.skills.length).toBe(1);
//   });
// });