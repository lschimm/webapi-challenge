const express = require("express");
const actions = require("../helpers/actionModel.js");
const router = express.Router();

// get
router.get("/", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(error => {
      res.status(500).json({ error: "action not found" });
    });
});

//insert
router.post("/:id", (req, res) => {
  const actionInfo = req.body;
  const { name, description, completed } = req.body;

  actions
    .insert(actionInfo)
    .then(hub => {
      if (!name) {
        res.status(400).json({ message: "provide name, description, etc" });
      } else {
        res.status(201).json(hub);
      }
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

module.exports = router;
