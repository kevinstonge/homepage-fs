const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const helmet = require("helmet");
server.use(helmet());
const domains = process.env.NODE_ENV === "development" ? ["*"] : ["self", "https://www.kevinstonge.com", "https://kevinstonge.com"];
const sources = process.env.NODE_ENV === "development" ? "unsafe-inline" : ["'self'", ...domains]
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["*"],
      "img-src": ["'self'", "blob:", "www.kevinstonge.com", "kevinstonge.com"],
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
console.log(corsConfig);
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
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = server;
