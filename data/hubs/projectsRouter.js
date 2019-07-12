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
        res.status(200).json();
      } else {
        res.status(404).json({ message: "can't find to update" });
      }
    })
    .catch(error => {
      res.status(500).json(err);
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

//getProjectActions

// router.get("/:id", async (req, res) => {
//   try {
//     const proj = await Projects.get(req.params.id);
//     if (project) {
//       res.status(200).json(proj);
//     } else {
//       res.status(404).json({ message: "project doesn't exist" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "couldn't get by that id" });
//   }
// });

module.exports = router;
