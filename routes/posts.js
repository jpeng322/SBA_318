const { updateFile } = require("../functions/functions.js");
const posts = require("../data/posts.js");
const express = require("express");
router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    posts,
    success: true,
  });
});

router.get("/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (post) {
    res.status(200).json({
      post,
      success: true,
    });
  } else {
    res.status(404).json({ error: "Not found", success: false });
  }
});

router.post("/", (req, res) => {
  const { title, description, username } = req.body;

  if (title && description && username) {
    const post = {
      id: posts[posts.length - 1]?.id + 1 || 1,
      title,
      description,
      username,
    };

    posts.push(post);
    updateFile("./data/posts.js", posts);
    res.status(201).json({
      post,
      success: true,
    });
  } else {
    res.status(400).json({ error: "Insufficient Data", success: false });
  }
});

module.exports = router;
