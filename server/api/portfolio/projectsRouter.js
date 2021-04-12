const Projects = require("./projectsModel");
const router = require("express").Router();
const upload = require("./middleware/fileUpload.js");
const auth = require("./middleware/authenticate.js");
const projectExists = require("./middleware/projectExists.js");
//200 OK, 201 CREATED, 400 BAD REQUEST, 401 UNAUTHORIZED, 500 INTERNAL SERVER ERROR

router.get("/", async (req, res) => {
  try {
    projects = await Projects.listProjects();
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
// router.post("/", [auth, upload.single("logo")], async (req, res) => {
//   //long_name (required), short_name, logo, proficiency
//   try {
//     if (req.body.long_name && req.body.long_name.length > 0) {
//       const newSkill = {
//         long_name: req.body.long_name,
//         short_name: req.body.short_name || "",
//         proficiency: req.body.proficiency || 0,
//         logo: req.file?.filename || "",
//       };
//       const addedSkill = await Projects.addSkill(newSkill);
//       if (addedSkill) {
//         res.status(201).json({ addedSkill });
//       }
//     } else {
//       res
//         .status(400)
//         .json({ message: "Projects must include a long_name value" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "server failed to create the skill" });
//     throw err;
//   }
// });

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
