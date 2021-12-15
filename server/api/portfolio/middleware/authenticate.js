const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.cookies?.auth) {
    const token = req.cookies.auth || "invalid";
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log('error in jwt.verify: ', err)
        res.redirect('/adminLogin');
      } else {
        console.log('passed jwt');
        next();
      }
    });
  } else {
    console.log('no auth cookie!!');
    console.log(`req.body: ${JSON.stringify(req.body)}\n---\nreq.method: ${req.method}\n--\nreq.headers: ${JSON.stringify(req.headers)}`);
    res.redirect('/adminLogin');
  }
};
