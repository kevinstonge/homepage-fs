const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log(req.headers);
  if (req.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1] || "invalid";
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(401).json({ message: "authentication failed" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "no authentication token provided, please log in" });
  }
};
