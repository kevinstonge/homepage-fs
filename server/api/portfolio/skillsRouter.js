const Skills = require("./skillsModel");
const router = require("express").Router();

// router.use('/:id', validation middleware)
router.get("/", async (req, res) => {
  try {
    skills = await Skills.listSkills();
    res.status(200).json({ skills });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
router.post("/", async (req, res) => {
  try {
    res.status(200).json({ message: "ok!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error!" });
  }
});

module.exports = router;
