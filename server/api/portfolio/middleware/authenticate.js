const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.cookies?.auth) {
    const token = req.cookies.auth || "invalid";
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.redirect('/adminLogin');
      } else {
        next;
      }
    });
    res.status(500).json({message: "auth middleware didn't return anything up to this point."});
  } else {
    res.redirect('/adminLogin'); //no??
  }
};
