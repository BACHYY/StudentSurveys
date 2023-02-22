import express from "express";
import USER from "../models/userModel.js";

const userRoutes = express.Router();

//API endpoint for creating a new user
// POST Request for creating a user
userRoutes.post("/user", async (req, res) => {
  const user = {
    name: "Ali",
    email: "ali@gmail.com",
    password: "12345",
  };
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  try {
    const createdUser = await USER.create(user);
    if (createdUser) {
      res.status(201).json({
        data: createdUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export default userRoutes;
