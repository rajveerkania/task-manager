const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const conn = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Connected to Database");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

conn();
