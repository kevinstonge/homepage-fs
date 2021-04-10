const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname)
  }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            res.status(400).json({message: "ERROR: image must be of type JPG, PNG, or GIF" })
        }
        else {
            cb(null, true);
        }
    }
});

module.exports = upload;