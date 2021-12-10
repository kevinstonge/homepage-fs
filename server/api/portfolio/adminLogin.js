const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
router.get("*", (req, res) => {
  router.use(stat("../../../adminLogin"));
  if (req.path === "/") {
    res.sendFile(path.join(__dirname, "../../../adminLogin", "index.html"));
  } else {
    res.sendFile(
      path.join(__dirname, "../../../adminLogin", decodeURI(req.path))
    );
  }
});

module.exports = router;