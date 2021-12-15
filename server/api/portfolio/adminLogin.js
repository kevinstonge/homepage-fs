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
    console.log(username);
    const user = await db("admin").where({username: username});
    console.log(user);
    if (user[0] === username) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user: req.body.user }, process.env.JWT_SECRET);
        res.status(200).json({token})
      } else {
        res.status(401).json({message: "incorrect password"})
      }
    } else {
      res.status(401).json({message: "no such user"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error during login attempt"})
  }
})
router.post("/logout", (req, res) => {
  res.clearCookie("auth").redirect("/adminLogin");
})
module.exports = router;