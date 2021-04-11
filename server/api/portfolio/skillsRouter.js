const Skills = require("./skillsModel");
const router = require("express").Router();
const upload = require('./middleware/fileUpload.js');
const auth = require('./middleware/authenticate.js');
//200 OK, 201 CREATED, 400 BAD REQUEST, 401 UNAUTHORIZED, 500 INTERNAL SERVER ERROR
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
router.post("/", [auth, upload.single('logo')], async (req, res) => {
  //long_name (required), short_name, logo, proficiency
  try {
    if (req.body.long_name && req.body.long_name.length > 0) {
      const newSkill = {
        long_name: req.body.long_name,
        short_name: req.body.short_name || "",
        proficiency: req.body.proficiency || 0,
        logo: req.file?.filename || ""
      }
      const addedSkill = await Skills.addSkill(newSkill);
      if (addedSkill) {
        res.status(201).json({ addedSkill });
      }
    } else {
      res.status(400).json({ message: "skills must include a long_name value" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server failed to create the skill" });
    throw err;
  }
});

module.exports = router;
