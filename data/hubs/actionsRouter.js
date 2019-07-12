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

// get by id
router.get("/:id", async (req, res) => {
  try {
    let user = await actions.get(req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "error getting id" });
  }
});

//insert
router.post("/:id", (req, res) => {
  const actionInfo = req.body;
  const { postid, name, description, completed } = req.body;

  actions
    .insert(actionInfo)
    .then(hub => {
      if (!postid) {
        res.status(400).json({ message: "provide id, etc" });
      } else {
        res.status(201).json(hub);
      }
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

//update
router.put("/:id", (req, res) => {
  const action = req.params.id;
  const changes = req.body;

  projects
    .update(action, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ message: "added, my guy" });
      } else {
        res.status(404).json({ message: "can't find to update" });
      }
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

// remove

router.delete("/:id", (req, res) => {
  actions.remove(req.params.id).then(deleted => {
    if (deleted > 0) {
      res.status(200).json({ message: `deleted ${deleted} record` });
    } else {
      res.status(404).json({ message: "could not delete" });
    }
  });
});

module.exports = router;
