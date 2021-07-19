const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMW");
const Word = require("../models/Words");

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Word.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("errors/500");
  }
});

module.exports = router;
