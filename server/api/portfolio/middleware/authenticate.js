const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "testing") {
    return next ? next() : true;
  }

  let token = "invalid";
  if (req.cookies?.auth) {
    token = req.cookies.auth;
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return next ? res.status(401).json({ messae: "unauthorized" }) : false;
      } else {
        return next ? next() : true;
      }
    });
  }
};
