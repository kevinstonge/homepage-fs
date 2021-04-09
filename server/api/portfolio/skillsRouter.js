const Skills = require("./skillsModel");
const router = require("express").Router();
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
  destination: "/images/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
})
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
router.post("/", async (req, res) => {
  //long_name (required), short_name, logo, proficiency
  try {
    console.log(req.body);
    let logoPath = "";
    if (req.body.logo) {
      const upload = multer({
        storage: storage,
        fileFilter: () => {
          if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
          }
          cb(null, true);
        },
      }).single('logo');
      upload(req, res, (err) => {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        }
        else if (!req.body.logo) {
          return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
          return res.send(err);
        }
        else if (err) {
          return res.send(err);
        }
        logoPath = req.body.logo.path;
      });
    }
    if (req.body.long_name && req.body.long_name.length > 0) {
      const newSkill = {
        long_name: req.body.long_name,
        short_name: req.body.short_name || "",
        proficiency: req.body.proficiency || 0,
        logo: req.body.logo?.path || ""
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
