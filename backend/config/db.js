const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Using my mogodb URL
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
