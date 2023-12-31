const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index.pug", { title: "Home", message: "Hello there!" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log(`Incoming signup information to routes ${req.url} - `);
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

function renderView(req, res) {
  const removeEmptyString = req.url.split("/").filter(item => item !== "")
  if (removeEmptyString.length === 2 && req.url.split("/")[1] === "api") {
    res.render(`${req.url.split("/")[2]}.pug`, {
      header: `${req.method} - ${req.url.split("/")[2]}`,
      items: res.body,
    });
  }
}

app.use((req, res, next) => {
  renderView(req, res);
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
