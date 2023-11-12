const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log("Incoming signup information - ")
    console.log(req.body);
  }
  next();
});

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

function handleError(res) {
  if (res.statusCode === 404) {
    res.json({ error: "Resource not found." });
  } else if (res.statusCode === 400) {
    res.json({ error: "Bad request - insufficient data." });
  }
}
app.use((req, res, next) => {
  handleError(res);
  next();
});

app.use((req, res) => {
  if (res.statusCode === 200 || res.statusCode === 201) {
    console.log("The results are:");
    console.log(res.body);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
