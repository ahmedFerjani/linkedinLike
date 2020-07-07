const express = require("express");
const app = express();

//Connecting to DB
const mongoConnect = require("./config/mongo");
mongoConnect();
app.get("/", (req, res) => {
  res.send("API running");
});


//Defining routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))

//Running server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
