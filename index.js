const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

app.use(express.json());


app.use((req, res, next) => {
  console.log(req.method)
  if (req.method === "POST") {
    console.log(req.body)
  }
  next()
} )


app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource not found" });
});



app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

