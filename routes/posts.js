const { updateFile } = require("../functions/functions.js");
const posts = require("../data/posts.js");
const users = require("../data/users.js");
const express = require("express");
router = express.Router();

router.get("/", (req, res, next) => {
  // console.log(posts, "THIS IS THE POSTS");
  // res.render("posts.pug", {
  //   title: "Posts",
  //   posts: posts,
  //   header: "GET - POSTS",
  // });
  // res.status(200).json({
  //   posts,
  //   success: true,
  // });

  res.body = posts;
  next();
});

router.get("/:id", (req, res, next) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (post) {
    res.status(200).json({
      post,
      success: true,
    });
    res.body = post;
  } else {
    res.status(404);
  }
  next();
});

router.post("/", (req, res, next) => {
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
    res.body = post;
  } else {
    res.status(400);
  }
  next();
});

module.exports = router;
