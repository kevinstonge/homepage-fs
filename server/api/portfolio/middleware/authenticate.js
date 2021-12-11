const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.cookies?.auth) {
    const token = req.cookies.auth || "invalid";
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log('error in jwt.verifty: ', err)
        res.redirect('/adminLogin');
      } else {
        console.log('passed jwt');
        next();
      }
    });
  } else {
    console.log(req.headers);
    console.log('no auth cookie!!');
    res.redirect('/adminLogin');
  }
};
