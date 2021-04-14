const Projects = require("./projectsModel");
const Skills = require("./skillsModel");
const router = require("express").Router();
const upload = require("./middleware/fileUpload.js");
const auth = require("./middleware/authenticate.js");
const validUrl = require("validator").isURL;
const projectExists = require("./middleware/projectExists.js");
//200 OK, 201 CREATED, 400 BAD REQUEST, 401 UNAUTHORIZED, 500 INTERNAL SERVER ERROR

router.get("/", async (req, res) => {
  try {
    projects = await Projects.listProjects();
    skills = await Skills.listSkills();
    res.status(200).json({ projects, skills });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
router.post("/", [auth, upload.single("image")], async (req, res) => {
  //title (required), url (required), description, image, github, rank (auto-assign on creation, allow change through ranking interface)
  try {
    if (
      req.body.title &&
      req.body.title.length > 0 &&
      req.body.url &&
      validUrl(req.body.url)
    ) {
      const newProject = {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description || "",
        image: req.file?.filename || "",
        github: req.body.github || "",
      };
      const skills = req.body?.skills || [];
      const addedProject = await Projects.addProject(newProject, skills);
      if (addedProject) {
        res.status(201).json({ addedProject });
      }
    } else {
      res.status(400).json({
        message: "Projects must include at least title and url values",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server failed to create the project" });
    throw err;
  }
});

// router.put(
//   "/:id",
//   [auth, skillExists, upload.single("logo")],
//   async (req, res) => {
//     try {
//       if (
//         !req.body.long_name &&
//         !req.body.short_name &&
//         !req.body.proficiency &&
//         !req.file?.filename
//       ) {
//         res.status(400).json({
//           message: "error: no valid values provided to update, no changes made",
//         });
//       } else {
//         const revisedSkill = {
//           //put requests to revise Projects can include only the properties to be changed:
//           ...(req.body.long_name && { long_name: req.body.long_name }),
//           ...(req.body.short_name && { short_name: req.body.short_name }),
//           ...(req.body.proficiency && { proficiency: req.body.proficiency }),
//           ...(req.file?.filename && { logo: req.file.filename }),
//         };
//         const updatedSkill = await Projects.updateSkill(
//           req.params.id,
//           revisedSkill
//         );
//         if (updatedSkill) {
//           res.status(200).json({ message: "successfully updated skill" });
//         } else {
//           res
//             .status(500)
//             .json({ message: "an error occurred while updating the skill" });
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "server failed to update the skill" });
//     }
//   }
// );

// router.delete("/:id", [auth, skillExists], async (req, res) => {
//   try {
//     const deleted = await Projects.deleteSkill(req.params.id);
//     if (deleted) {
//       res
//         .status(200)
//         .json({ message: `skill ${req.params.id} deleted successfully` });
//     } else {
//       res.status(500).json({ message: "error deleting skill" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "error accessing database" });
//   }
// });
module.exports = router;
