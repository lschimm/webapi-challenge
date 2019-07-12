const express = require("express");
const router = express.Router();
const projects = require("../helpers/projectModel.js");

router.get("/", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(error => {
      res.status(500).json({ error: "project not found" });
    });
});
//works

// get by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("here\n", id);
  projects
    .get(id)
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(error => {
      res.status(500).json({ message: "id not found" });
    });
});

// insert

router.post("/:id", (req, res) => {
  const projectInfo = req.body;
  const { name, description, completed } = req.body;

  projects
    .insert(projectInfo)
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
// works

// update
router.put("/:id", (req, res) => {
  const name = req.params.id;
  const changes = req.body;

  projects
    .update(name, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ message: "added, dude" });
      } else {
        res.status(404).json({ message: "can't find to update" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "something goofed" });
    });
});
//?

// remove

router.delete("/:id", (req, res) => {
  projects.remove(req.params.id).then(deleted => {
    if (deleted > 0) {
      res.status(200).json({ message: `deleted ${deleted} record` });
    } else {
      res.status(404).json({ message: "could not delete" });
    }
  });
});

//works

// getProjectActions

router.get("/this", (req, res) => {
  projects.getProjectActions(req.params.id).then(maybe => {
    if (actions) {
      res.status(200).json({ actions });
    } else {
      res.status(404).json({ message: "no actions" });
    }
  });
});

module.exports = router;
