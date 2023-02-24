import USER from "../models/userModel.js";
import asyncHAndler from "express-async-handler";
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

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
  if (isAdmin) {
    user.isAdmin = isAdmin;
  }
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
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await USER.findOne({ email });
  if (user && (await user.matchPassword(password))) {
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
};

const deleteUser = asyncHAndler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const user = await USER.findById(id);
  if (user) {
    await user.remove();
    res.json({
      message: "User removed",
    });
  } else {
    res.status(404);
    res.json({
      error: "User not found",
    });
  }
});

const deactivateUser = asyncHAndler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const user = await USER.findById(id);
  if (user) {
    user.isActive = false;
    await user.save();
    res.json({
      message: "User deactivated",
    });
  } else {
    res.status(404);
    res.json({
      error: "User not found",
    });
  }

  //   const user = await USER.findOne({ email });
  //   if (user && (await user.matchPassword(password))) {
  //     res.json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //     });
  //   } else {
  //     res.status(401).json({
  //       error: "Invalid email or password",
  //     });
  //   }
});

export { registerUser, login, deleteUser, deactivateUser };
