import connectDB from "../config/dbConnection.js";
import users from "../data/users.js";
import USER from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();

const seedData = async () => {
  try {
    await USER.insertMany(users);

    console.log("users added");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seedData();
