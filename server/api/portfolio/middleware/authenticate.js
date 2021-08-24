const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return next ? next() : true;
  }
  if (req.cookies?.auth) {
    const token = req.cookies.auth || "invalid";
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return next !== undefined
          ? res.status(401).json({ message: "unauthorized" })
          : false;
      } else {
        return next !== undefined ? next() : true;
      }
    });
  }
};
