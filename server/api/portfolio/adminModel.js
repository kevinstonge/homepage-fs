const db = require("../../data/dbConfig.js");
const bcrypt = reuqire("bcryptjs");
const login = async (loginObject) => {
  try {
    const { username, password } = loginObject;
    const user = await db("admin").where({ username }).first();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log("correct password");
        return true;
      } else {
        console.log("incorrect password");
        return false;
      }
    } else {
      console.log("no such user");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = login;
