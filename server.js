const express = require("express");

const app = express();
const mongoConnect = require("./config/mongo");
mongoConnect();
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
