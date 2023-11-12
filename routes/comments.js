const { updateFile } = require("../functions/functions.js");
const comments = require("../data/comments.js");
const express = require("express");

router = express.Router();
router.get("/", (req, res, next) => {
  // res.status(200).json({
  //   comments,
  //   success: true,
  // });

  res.body = comments;
  next();
});

router.get("/:id", (req, res, next) => {
  const comment = comments.find(
    (comment) => comment.id === parseInt(req.params.id)
  );

  if (comment) {
    res.status(200).json({
      comment,
      success: true,
    });
    res.body = comment;
  } else {
    res.status(404);
  }
  next();
});

router.post("/", (req, res, next) => {
  const { description, username, postId } = req.body;

  if (description && username && postId) {
    const comment = {
      id: comments[comments.length - 1]?.id + 1 || 1,
      postId,
      username,
      description,
    };

    comments.push(comment);
    updateFile("./data/comments.js", comments);
    res.status(201).json({
      comment,
      success: true,
    });
    res.body = comment;
  } else {
    res.status(400);
  }
  next();
});
module.exports = router;
