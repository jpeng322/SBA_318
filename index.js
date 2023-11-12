const express = require("express");
const app = express();
const port = 3000;
const users = require("./data/users.js");
const posts = require("./data/posts.js");
const comments = require("./data/comments.js");
const fs = require("fs");
const bodyParser = require("body-parser");
const { updateFile } = require("./functions/functions.js");

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// app.use(express.json());
app.get("/", (req, res) => {
  res.send("This is the home page. Server is available");
});

app.post("/api", (req, res) => {
  res.send("Test for api post route");
});

app.put("/api", (req, res) => {
  res.send("Test for api put route");
});

app.post("/api/users", (req, res) => {
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

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    res.status(200).json({ user, success: true });
  } else {
    res.status(400).json({ error: "Insufficient Data", success: false });
  }
});

app.get("/api/posts", (req, res) => {
  res.status(200).json({
    posts,
    success: true,
  });
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id == req.params.id);
  res.status(200).json({
    post,
    success: true,
  });
});

app.post("/api/posts", (req, res) => {
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

app.get("/api/comments/:id", (req, res) => {
  const comment = comments.find((post) => post.id == req.params.id);
  res.status(200).json({
    comment,
    success: true,
  });
});

app.post("/api/comments", (req, res) => {
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
  } else {
    res.status(400).json({ error: "Insufficient Data", success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
