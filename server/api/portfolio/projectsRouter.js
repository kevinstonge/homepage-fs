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
      else {
        res.status(500).json({message: "unable to add project"})
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

router.put(
  "/:id",
  [auth, projectExists, upload.single("image")],
  async (req, res) => {
    try {
      if ( 
        !req.body.title &&
        !req.body.description &&
        !req.file?.filename &&
        !req.body.github &&
        !req.body.url &&
        !req.body.rank &&
        !req.body.skills 
      ) {
        res.status(400).json({
          message: "error: no valid values provided to update, no changes made",
        });
      } else { 
        const revisedProject = {
          ...(req.body.title && { title: req.body.title }),
          ...(req.body.description && { description: req.body.description }),
          ...(req.file?.filename && { image: req.file.filename }),
          ...(req.body.github && { github: req.body.github }),
          ...(req.body.url && { url: req.body.url }),
          ...(req.body.rank && { rank: req.body.rank }),
          ...(req.body.skills && { skills: req.body.skills })
        };
        const updatedProject = await Projects.updateProject(
          req.params.id,
          revisedProject
        );
        if (updatedProject) {
          res.status(200).json({ message: "successfully updated project", updatedProject });
        } else {
          res
            .status(500)
            .json({ message: "an error occurred while updating the project" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server failed to update the project" });
    }
  }
);
router.delete("/:id", [auth, projectExists], async (req, res) => {
  try {
    const deleted = await Projects.deleteProject(req.params.id);
    if (deleted) {
      res
        .status(200)
        .json({ message: `project ${req.params.id} deleted successfully` });
    } else {
      res.status(500).json({ message: "error deleting project" });
    }
  } catch (err) {
    res.status(500).json({ message: "error accessing database" });
  }
});
module.exports = router;
