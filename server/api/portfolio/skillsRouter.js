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
  //long_name (required), short_name, logo, proficiency
  try {
    if (req.body.skill.long_name && req.body.skill.long_name.length > 0) {
      const newSkill = await Skills.addSkill(req.body.skill);
      if (newSkill) {
        res.status(200).json({ newSkill });
      }
    } else {
      res.status(500).json({ message: "error1" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error2" });
  }
});

module.exports = router;
