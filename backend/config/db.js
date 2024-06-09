const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Using my mogodb URL
    mongoose.connect(
      process.env.MONGO_URL
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
