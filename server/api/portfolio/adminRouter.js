const router = require("express").Router();
const static = require("express").static;
const path = require("path");
const authenticate = require("./middleware/authenticate.js");
const login = require("./adminModel.js");
const jwt = require("jsonwebtoken");

// this router is invoked by /admin path

//check cookies for authentication
router.get("*", (req, res) => {
  if (authenticate(req)) {
    //if authenticated, send to admin/build/index.html
    router.use(static("../../../admin"));
    if (req.path === "/") {
      //for root path, just send index.html
      res.sendFile(path.join(__dirname, "../../../admin/build", "index.html"));
    } else {
      //if another path is specified, send the requested path/file (I think this hands off to React routes, not sure yet!)
      res.sendFile(
        path.join(__dirname, "../../../admin/build", decodeURI(req.path))
      );
    }
  } else {
    //if not authenticated, send to admin/login.html
    res.sendFile(path.join(__dirname, "../../../admin", "login.html"));
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username || "incorrect";
    const password = req.body.password || "invalid";
    const authorized = await login({ username, password });
    if (authorized) {
      res
        .cookie(
          "auth",
          jwt.sign({ user: req.body.user }, process.env.JWT_SECRET)
        )
        .redirect("/admin");
    } else {
      console.log("unauthorized");
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/admin/login");
    throw error;
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth");
});

module.exports = router;
