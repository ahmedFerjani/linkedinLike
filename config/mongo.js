const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoAtlas");
useNewUrlParser: true;
const mongoConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("connection with database successfully established ");
  } catch (err) {
    console.log("cant connect to mongoDB");
    process.exit(1);
  }
};

module.exports = mongoConnect;
