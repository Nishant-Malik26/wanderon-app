const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Using my mogodb URL
    mongoose.connect(
      "mongodb+srv://nishantmalik2015:qYRh1Om8mNf8G7ih@cluster0.0uzogt3.mongodb.net/wanderon"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
