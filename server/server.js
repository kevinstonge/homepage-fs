const express = require('express');
const server = express();
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());
const cors = require('cors');
server.use(cors());

const path = require("path");
server.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://www.kevinstonge.com http://kevinstonge.com;"
  );
  next();
});
server.use('/api', (req, res) => { //todo: set up api router
    res.json({ message:"test"})
})

server.use(express.static('../client/build/'));

server.get("*", (req, res) => { 
 res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});



module.exports = server;