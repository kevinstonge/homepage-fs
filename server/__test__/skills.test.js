require('dotenv').config();
const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const path = require('path');
const goodCookie = 'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgwOTk1MDl9.1gPizbSQ_qfZHjCR55GxCIn-bT3JgKANCB-_zg2E_KY';
beforeAll(async () => {
  await db("projects-skills").truncate();
  await db("skills").truncate();
  await db("projects").truncate();
});

describe("POST requests to /api/portfolio/skills with bad input", () => {
    it("should respond with 400 if incomplete data is provided", async () => {
      const result = await request(server)
        .post("/api/portfolio/skills")
        .set('Cookie', goodCookie)
        .send({ "short_name": "js" });
        expect(result.status).toBe(400);
    });
});
describe("GET requests to /api/portfolio/skills", () => {
  it("should respond with full list of skills", async () => {
    const result = await request(server).get("/api/portfolio/skills");
    expect(result.body.skills.length).toBe(0);
  });
});

describe("POST requests to /api/portfolio/skills with NO logo image provided", () => {
  it("should respond with the new skill", async () => {
    const result = await request(server)
      .post("/api/portfolio/skills")
      .set('Cookie', goodCookie)
      .send({
          long_name: "JavaScript (ECMA Script 5)",
          short_name: "js",
          proficiency: 3,
      });
    expect(result.body.addedSkill.length).toBe(1);
  });
});

describe("POST requests to /api/portfolio/skills with image attachment", () => {
  it("should respond with 201", async () => {
    try {
      const result = await request(server)
        .post('/api/portfolio/skills')
        .set('Cookie', goodCookie)
        .field('long_name', "HTML 5")
        .field('short_name', 'html')
        .field('proficiency', 3)
        .attach('logo', path.join(__dirname, "../images/test.png"));
      expect(result.status).toBe(201);
      expect(result.body.addedSkill.length).toBe(1);
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  })
});

describe("GET requests to /api/portfolio/skills", () => {
  it("should respond with full list of skills", async () => {
    const result = await request(server).get("/api/portfolio/skills");
    expect(result.body.skills.length).toBe(2);
    expect(result.body.skills[0].short_name).toBe("js");
    expect(result.body.skills[1].logo).toBe('logo-test.png');
  });
});

describe("PUT requests to /api/portfolio/skills/:id for an id that doesn't exist", () => {
  it("should respond with status 404", async () => {
    const result = await request(server).put("/api/portfolio/skills/7").set('Cookie', goodCookie);
    expect(result.status).toBe(404);
  })
})