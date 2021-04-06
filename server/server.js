const express = require("express");
const server = express();
server.use(express.json());
const helmet = require("helmet");
// ser`ver.use(helmet());
const cors = require("cors");
server.use(cors());
const cp = require("cookie-parser");
server.use(cp());
var bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const path = require("path");
// server.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self' http://www.kevinstonge.com http://kevinstonge.com;"
//   );
//   next();
// });
server.use("/admin", require("./api/portfolio/adminRouter.js"));
server.use("/api/portfolio/skills", require("./api/portfolio/skillsRouter.js"));

server.use(express.static("../client/build/"));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = server;
