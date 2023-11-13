const users = require("../data/users.js");
const { updateFile } = require("../functions/functions.js");
const express = require("express");
router = express.Router();

router.post("/", (req, res, next) => {
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
    // res.status(201).json({
    //   user,
    //   success: true,
    // });
    res.body = user
    res.status(201).redirect("/")
   
  } else {
    res.status(400);
  }

  next();
});

router.get("/", (req, res, next) => {
  // res.status(200).json({
  //   users,
  //   success: true,
  // });
  res.body = users;
  next();
});

router.get("/:id", (req, res, next) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));

  if (user) {
    res.status(200).json({ user, success: true });
  } else {
    res.status(404);
  }
  res.body = user;

  next();
});

module.exports = router;
