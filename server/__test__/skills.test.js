const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");
beforeAll(async () => {
  await db("projects-skills").truncate();
  await db("skills").truncate();
  await db("projects").truncate();
});
describe("GET requests to /api/portfolio/skills", () => {
  it("should respond with full list of skills", async () => {
    const result = await request(server).get("/api/portfolio/skills");
    expect(result.body.skills.length).toBe(0);
  });
});
describe("POST requests to /api/portfolio/skills", () => {
  it("should respond with the new skill", async () => {
    const result = await request(server)
      .post("/api/portfolio/skills")
      .send({
        skill: {
          long_name: "JavaScript (ECMA Script 5)",
          short_name: "js",
          proficiency: 3,
        },
      });
    expect(result.body.newSkill.length).toBe(1);
  });
});
describe("GET requests to /api/portfolio/skills", () => {
  it("should respond with full list of skills", async () => {
    const result = await request(server).get("/api/portfolio/skills");
    expect(result.body.skills.length).toBe(1);
    expect(result.body.skills[0].short_name).toBe("js");
  });
});
// describe("POST requests to /api/portfolio/skills with bad input", () => {
//     it("should respond with 400 if incomplete data is provided", async () => {
//         const result = await request(server).post("/api/portfolio/skills").send({ "long_name": "JavaScript (ECMA Script 5)" });
//         expect(result.status).toBe(400);
//     });
// });
