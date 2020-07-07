const express = require("express");
const app = express();

//setting headers 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//accepting raw json requests
app.use(express.json({ extended: false }));

const multer = require("multer");

//Using logger to show requests
const logger = require("morgan");
app.use(logger("dev"));

//Connecting to DB
const mongoConnect = require("./config/mongo");
mongoConnect();
app.get("/", (req, res) => {
  res.send("API running");
});



//Defining routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

//Running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
