const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token = "invalid";
  if (req.cookies?.auth) {
    token = req.cookies.auth;
  } else if (req.headers?.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (jwt.verify(token, process.env.JWT_SECRET)) {
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
