const path = require("path");
const jwt = require("jsonwebtoken");
module.exports = (req) => {
  if (
    req.cookies &&
    req.cookies.auth &&
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET)
  ) {
    return true;
  } else {
    return false;
  }
};
