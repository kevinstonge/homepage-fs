const router = require("express").Router();
const db = require("../../data/dbConfig.js");

router.post("/", (req, res) => {
  try {
    res.status(200).json({ message: "message sent" })
  } catch (err) {
    res.status(500).json({ message: "error sending message" })
  }
});

module.exports = router;