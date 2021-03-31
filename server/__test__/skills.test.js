const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
beforeAll(async () => {
    await db('projects-skills').truncate();
    await db('skills').truncate();
    await db('projects').truncate();
});
describe("POST requests to /api/portfolio/skills with bad input", () => {
    it("should respond with 400 if incomplete data is provided", async () => {
        const result = await request(server).post("/api/portfolio/skills").send({ "long_name": "JavaScript (ECMA Script 5)" });
        expect(result.status).toBe(400);
    });
});