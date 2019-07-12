const express = require("express");
const actions = require("../helpers/actionModel.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await actions.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: "couldn't get action" });
  }
});

module.exports = router;
