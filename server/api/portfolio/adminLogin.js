const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const db = require("../../data/dbConfig.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
router.post("/login", async (req, res) => {
   try {
    const username = req.body.username || "incorrect";
    const password = req.body.password || "invalid";
    const user = await db("admin").where({ username }).first();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
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
        res.redirect("/adminLogin");
      }
    } else {
      res.redirect("/adminLogin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/adminLogin");
  }
})
router.post("/logout", (req, res) => {
  res.clearCookie("auth").redirect("/adminLogin");
})
module.exports = router;