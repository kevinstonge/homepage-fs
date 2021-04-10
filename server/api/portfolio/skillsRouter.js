const Skills = require("./skillsModel");
const router = require("express").Router();
const multer = require('multer');
const path = require("path");
const upload = multer({
  dest: "images/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + path.extname(file.originalname))
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

router.post("/images", upload.single('logo'), async (req, res) => {
  console.log(req.body.long_name);
  res.status(201).json({message:"might have worked"})
  // let logoPath = "";
  // try {
  //   const upload = multer({
  //     storage: storage,
  //     fileFilter: () => {
  //       if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //         req.fileValidationError = 'Only image files are allowed!';
  //         return cb(new Error('Only image files are allowed!'), false);
  //       }
  //       else {
  //         logoPath = file.fieldname + path.extname(file.originalname);
  //         cb(null, true);
  //       }
  //     },
  //   }).single('logo');
  //   upload(req, res, (err) => {
  //     console.log('upload');
  //     if (req.fileValidationError) {
  //       return res.status(400).send(req.fileValidationError);
  //     }
  //     else if (!req.body.logo) {
  //       return res.status(400).send('Please select an image to upload');
  //     }
  //     else if (err instanceof multer.MulterError) {
  //       return res.status(400).send(err);
  //     }
  //     else if (err) {
  //       return res.status(500).send(err);
  //     }
  //     else {
  //       res.status(201).json({message: "file uploaded"});
  //     }
  //   });
  // }
  // catch (err) {
  //   console.log(err);
  //   res.status(500).json({message: "server error"});
  // }
})

module.exports = router;
