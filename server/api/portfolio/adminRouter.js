const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const authenticate = require("./middleware/authenticate.js");
// const logger = require("./middleware/log.js");
// router.use(logger);
router.get("*", authenticate, (req, res) => {
  try {
    router.use(stat("../../../admin/build"));
    if (['js', 'css', 'png', 'map', 'json'].includes(req.path.split('.').slice(-1)[0])) {
      res.sendFile(path.join(__dirname, "../../../admin/build", req.path));
    } else {
      res.sendFile(path.join(__dirname, "../../../admin/build", "index.html"));
    }
  } catch {
    res.status(404).json({message: "not found"})
  }
});

module.exports = router;
