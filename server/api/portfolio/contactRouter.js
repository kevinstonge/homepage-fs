const router = require("express").Router();

router.post("/", (req, res) => {
  try {
    console.log(req.body);
    const send = require("gmail-send")({
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: `${process.env.GMAIL_USER}@gmail.com`,
      subject: `[hpfs] - new message from ${req.body.email}`,
    });
    send({ text: req.body.text }, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    })
    res.status(200).json({ message: "message sent" })
  } catch (err) {
    res.status(500).json({ message: "error sending message" })
  }
});

module.exports = router;