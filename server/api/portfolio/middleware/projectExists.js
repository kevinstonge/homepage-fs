const db = require("../../../data/dbConfig.js");
module.exports = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id || !Number.isInteger(id)) {
    res.status(400).json({ message: "error: invalid or missing id in path" });
  } else {
    try {
      const project = await db("projects").where({ id });
      if (project[0]?.id === id) {
        next();
      } else {
        res
          .status(404)
          .json({ message: `no project with that id (${id} exists` });
      }
    } catch (err) {
      throw err;
    }
  }
};
