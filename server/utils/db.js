require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection To the Successful To DB !");
  } catch (error) {
    console.error("Databases Connection Failed !");
    process.exit(0);
  }
};

module.exports = connectDb;
