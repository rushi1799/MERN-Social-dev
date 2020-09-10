const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1); //if error exist this process
  }
};

module.exports = connectDB;
