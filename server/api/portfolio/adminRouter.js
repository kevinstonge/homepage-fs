const router = require("express").Router();
const static = require("express").static;
const authenticate = require("./middleware/authenticate.js");

// this router is invoked by /admin path

//check cookies for authentication
router.get("*", (req, res) => {
  if (authenticate(req)) {
    //if authenticated, send to adminClient/build/index.html
    router.use(static("../adminClient"));
    if (req.path === "/") {
      //for root path, just send index.html
      res.sendFile(path.join(__dirname, "../adminClient/build", "index.html"));
    } else {
      //if another path is specified, send the requested path/file (I think this hands off to React routes, not sure yet!)
      res.sendFile(
        path.join(__dirname, "../adminClient/build", decodeURI(req.path))
      );
    }
  } else {
    //if not authenticated, send to adminClient/login.html
    res.sendFile(path.join(__dirname, "../adminClient", "login.html"));
  }
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.user || "incorrect";
    const password = req.body.pass || "invalid";
    const authorized = await User.login({ username, password });
    if (authorized) {
      res
        .cookie(
          "auth",
          jwt.sign({ user: req.body.user }, process.env.JWT_SECRET)
        )
        .redirect("/");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth");
});

module.exports = router;
