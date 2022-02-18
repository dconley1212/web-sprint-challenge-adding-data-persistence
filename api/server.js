// build your server here and require it from index.js
const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("tiny"));

server.get("/", (res, req) => {
  res.send(`<h1>Welcome to the sprint challenge Server</h1>`);
});

module.exports = server;
