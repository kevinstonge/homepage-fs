const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const db = require("../../data/dbConfig.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("*", (req, res) => {
  try {
    router.use(stat("../../../admin/build"));
    if (
      ["js", "css", "png", "map", "json"].includes(
        req.path.split(".").slice(-1)[0]
      )
    ) {
      res.sendFile(path.join(__dirname, "../../../admin/build", req.path));
    } else {
      res.sendFile(path.join(__dirname, "../../../admin/build", "index.html"));
    }
  } catch {
    res.status(404).json({ message: "not found" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username || "incorrect";
    const password = req.body.password || "invalid";
    const user = await db("admin").where({ username: username });
    if (user[0].username === username) {
      if (bcrypt.compareSync(password, user[0].password)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "incorrect password" });
      }
    } else {
      res.status(401).json({ message: "no such user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error during login attempt" });
  }
});

module.exports = router;
