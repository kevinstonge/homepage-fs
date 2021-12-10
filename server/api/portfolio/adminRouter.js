const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const authenticate = require("./middleware/authenticate.js");
const login = require("./adminModel.js");
const jwt = require("jsonwebtoken");
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

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username || "incorrect";
    const password = req.body.password || "invalid";
    const authorized = await login({ username, password });
    if (authorized) {
      const token = jwt.sign({ user: req.body.user }, process.env.JWT_SECRET);
      res
        .cookie("auth", token, {
          sameSite: "strict",
          // httpOnly: true,
          // secure: true,
          // domain: "*.kevinstonge.com",
        })
        .redirect(`/admin`);
    } else {
      console.log("unauthorized");
      res.redirect("/adminLogin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/adminLogin");
    throw error;
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth").redirect("/adminLogin");
});

module.exports = router;
