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
// describe("POST requests to /api/portfolio/skills with bad input", () => {
//     it("should respond with 400 if incomplete data is provided", async () => {
//         const result = await request(server).post("/api/portfolio/skills").send({ "long_name": "JavaScript (ECMA Script 5)" });
//         expect(result.status).toBe(400);
//     });
// });
