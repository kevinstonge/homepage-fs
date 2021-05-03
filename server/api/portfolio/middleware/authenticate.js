const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  //this block is for development across multiple machines
  if (process.env.NODE_ENV === "testing") {
    if (next !== undefined) { next() }
    return true
  }
  //end dev block
  let token = "invalid";
  if (req.cookies?.auth) {
    token = req.cookies.auth;
  } else if (req.headers?.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token !== "invalid" && jwt.verify(token, process.env.JWT_SECRET)) {
    if (next !== undefined) {
      next();
    } else {
      return true;
    }
  } else {
    if (next !== undefined) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      return false;
    }
  }
};
