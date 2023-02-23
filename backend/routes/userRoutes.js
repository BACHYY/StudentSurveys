import express from "express";
import USER from "../models/userModel.js";
// creating apis
const userRoutes = express.Router();

//API endpoint for creating a new user
// POST Request for creating a user
//Route /api/users
userRoutes.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //findOne method from mongooose to get only one document
  //this method takes an object for where clause
  const userExists = await USER.findOne({ email: email });
  console.log({ userExists });
  if (userExists) {
    res.status(400).json({
      error: "User against this email already exits",
    });
  }
  //if the key value pairs are same , write like this
  const user = {
    name,
    email,
    password,
  };
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  try {
    const createdUser = await USER.create(user);

    if (createdUser) {
      res.status(201).json({
        user: createdUser,
        msg: "user created",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Log in Api
//Request type POST
//Route /api/users/login
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await USER.findOne({ email });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({
      error: "Invalid email or password",
    });
  }
});

export default userRoutes;
