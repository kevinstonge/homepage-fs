const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const authenticate = require("./middleware/authenticate.js");
const login = require("./adminModel.js");
const jwt = require("jsonwebtoken");
const logger = require("./middleware/log.js");
router.use(logger);
router.get("*", (req, res) => {
  if (authenticate(req)) {
    router.use(stat("../../../admin/build"));
    if (req.path === "/") {
      res.sendFile(path.join(__dirname, "../../../admin/build", "index.html"));
    } else {
      res.sendFile(
        path.join(__dirname, "../../../admin/build", decodeURI(req.path))
      );
    }
  } else {
    router.use(stat("../../../adminLogin"));
    if (req.path === "/") {
      res.sendFile(path.join(__dirname, "../../../adminLogin", "index.html"));
    } else {
      res.sendFile(
        path.join(__dirname, "../../../adminLogin", decodeURI(req.path))
      );
    }
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
