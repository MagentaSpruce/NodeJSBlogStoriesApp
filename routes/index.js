const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/authMW");
const Word = require("../models/Words");

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const words = await Word.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      words,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
