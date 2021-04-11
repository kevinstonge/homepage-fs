const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (
    req.cookies &&
    req.cookies.auth &&
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET)
  ) {
    if (next !== undefined) { next() }
    else { return true }
  } else {
    if (next !== undefined) { res.status(401).json({ message: "unauthorized" }) }
    else { return false }
  }
};
