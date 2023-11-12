const express = require("express");
const app = express();
const port = 3000;
const users = require("./data/users.js");
const posts = require("./data/posts.js");
const comments = require("./data/comments.js");
const fs = require("fs");
const bodyParser = require("body-parser");
const { updateFile } = require("./functions/functions.js");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");
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

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);


app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
