const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const helmet = require("helmet");
server.use(helmet());
const domains = process.env.NODE_ENV === "development" ? ["*"] : ["'self'", "https://www.kevinstonge.com", "https://kevinstonge.com", "http://www.kevinstonge.com", "http://kevinstonge.com"];
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": domains,
      "img-src": [...domains, "blob:"],
      upgradeInsecureRequests: [],
    },
  })
);
const cors = require("cors");
const corsConfig =
  process.env.NODE_ENV === "development"
    ? { origin: "*" }
    : {
        credentials: true,
        origin: domains,
      };
server.use(cors(corsConfig));
const cp = require("cookie-parser");
server.use(cp());
const path = require("path");
server.use("/admin", require("./api/portfolio/adminRouter.js"));
server.use("/api/portfolio/skills", require("./api/portfolio/skillsRouter.js"));
server.use(
  "/api/portfolio/projects",
  require("./api/portfolio/projectsRouter.js")
);
server.use("/images", express.static("./images"));
server.use(express.static("../client/build/"));
server.get("*", (req, res) => {
  if (['js', 'css', 'png', 'map', 'json'].includes(req.path.split('.').slice(-1)[0])) {
    res.sendFile(path.join(__dirname, "../client/build", req.path));
  } else {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  }
});

module.exports = server;
