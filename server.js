const express = require("express");
const server = express();

// const data = require("./data/helpers/projectModel.js");
const actionsRouter = require("./data/hubs/actionsRouter.js");
const projectsRouter = require("./data/hubs/projectsRouter.js");

server.get("/api", (req, res) => {
  res.send(`<h2>uuughh</h2>`);
});

server.use(express.json());

server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

module.exports = server;
