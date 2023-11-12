const express = require("express");
const users = require("../data/users.js");
const { updateFile } = require("../functions/functions.js");
router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { fname, lname, username, email } = req.body;
  if (fname && lname && username && email) {
    if (users.find((user) => user.email === email)) {
      res.json({ error: "Email is already in use." });
      return;
    }

    if (users.find((user) => user.username === username)) {
      res.json({ error: "Username is already taken." });
      return;
    }
    const user = {
      id: users[users.length - 1]?.id + 1 || 1,
      fname,
      lname,
      username,
      email,
    };
    users.push(user);
    updateFile("./data/users.js", users);
    res.status(201).json({
      user,
      success: true,
    });
  } else {
    res.status(400).json({ error: "Insufficient Data" });
  }
});

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    res.status(200).json({ user, success: true });
  } else {
    res.status(400).json({ error: "Insufficient Data", success: false });
  }
});

module.exports = router;
