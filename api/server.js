const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./project/router");
const resourceRouter = require("./resource/router");
const taskRouter = require("./task/router");
const server = express();

server.use(express.json());
server.use(morgan("tiny"));
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

server.get("/", (res, req) => {
  res.send(`<h1>Welcome to the sprint challenge Server</h1>`);
});

module.exports = server;
