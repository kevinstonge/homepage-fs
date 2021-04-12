const db = require("../../../data/dbConfig.js");
module.exports = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id || !Number.isInteger(id)) {
    res.status(400).json({ message: "error: invalid or missing id in path" });
  } else {
    try {
      const skill = await db("skills").where({ id });
      if (skill[0]?.id === id) {
        next();
      } else {
        res
          .status(404)
          .json({ message: `no skill with that id (${id} exists` });
      }
    } catch (err) {
      throw err;
    }
  }
};
