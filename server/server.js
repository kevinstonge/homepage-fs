const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// const helmet = require("helmet");
// server.use(helmet());
// server.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [
//         "'self'",
//         "www.kevinstonge.com",
//         "kevinstonge.com",
//         "localhost:3000",
//       ],
//       upgradeInsecureRequests: [],
//     },
//   })
// );
const cors = require("cors");
server.use(cors());
const cp = require("cookie-parser");
server.use(cp());
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
server.use(
  "/api/portfolio/projects",
  require("./api/portfolio/projectsRouter.js")
);
server.use(express.static("../client/build/"));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = server;
