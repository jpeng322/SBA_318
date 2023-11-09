const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("This is the home page. Server is available");
});

app.post("/api", (req, res) => {
  res.send("Test for api post route");
});

app.put("/api", (req, res) => {
  res.send("Test for api put route");
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
