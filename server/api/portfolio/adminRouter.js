const router = require("express").Router();
const stat = require("express").static;
const path = require("path");
const authenticate = require("./middleware/authenticate.js");
const login = require("./adminModel.js");
const jwt = require("jsonwebtoken");

// this router is invoked by /admin path

//check cookies for authentication
router.get("*", (req, res) => {
  if (authenticate(req)) {
    //if authenticated, send to admin/build/index.html
    router.use(stat("../../../admin/"));
    if (req.path === "/") {
      //for root path, just send index.html
      res.sendFile(path.join(__dirname, "../../../admin/build/", "index.html"));
    } else {
      //if another path is specified, send the requested path/file (I think this hands off to React routes, not sure yet!)
      res.sendFile(
        path.join(__dirname, "../../../admin/build/", decodeURI(req.path))
      );
    }
  } else {
    router.use(stat("../../../adminLogin/"));
    //if not authenticated, send to adminLogin/ (same logic as above)
    if (req.path === "/") {
      res.sendFile(path.join(__dirname, "../../../adminLogin/", "index.html"));
    } else {
      res.sendFile(
        path.join(__dirname, "../../../adminLogin/", decodeURI(req.path))
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
      res
        .cookie(
          "auth",
          jwt.sign({ user: req.body.user }, process.env.JWT_SECRET)
        )
        .redirect("/admin");
    } else {
      console.log("unauthorized");
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
    throw error;
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth");
});

module.exports = router;
