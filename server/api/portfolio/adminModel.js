const db = require("../../data/dbConfig.js");
const bcrypt = require("bcryptjs");
const login = async (loginObject) => {
  try {
    const { username, password } = loginObject;
    const user = await db("admin").where({ username }).first();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = login;
