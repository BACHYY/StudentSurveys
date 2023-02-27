import USER from "../models/userModel.js";
import asyncHAndler from "express-async-handler";
import bcrypt from "bcryptjs";
import { escapeRegex } from "../utils/utils.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHAndler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  //findOne method from mongooose to get only one document
  //this method takes an object for where clause
  const userExists = await USER.findOne({ email: email });
  console.log({ userExists });
  if (userExists) {
    res.status(400);
    throw new Error("User against this email already exits");
    // .json({
    //   error: "",
    // });
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
  const createdUser = await USER.create(user);

  if (createdUser) {
    res.status(201).json({
      user: createdUser,
      msg: "user created",
    });
  }
});

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await USER.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
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

const updateUser = asyncHAndler(async (req, res) => {
  const { id } = req.params;
  const user = await USER.findById(id);
  if (user) {
    //if user opts to uptae it's name then we will get name from body
    //otherwise we use the same/existing name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      if (await user.matchPassword(req.body.password)) {
        throw new Error(
          "You can't use an old password, Please enter different one"
        );
      }
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      message: "User details updated successfully",
      user: updatedUser,
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

const searchByName = async (req, res, next) => {
  const name = req.query.name; // assuming the search query parameter is named 'name'
  const regex = new RegExp(escapeRegex(name), "gi");
  console.log({ name });
  try {
    // const users = await USER.find({ name: { $regex: name, $options: "i" } }); // using regex to search for names that contain the given search query
    // const users = await USER.find({ name: regex });
    let users = await USER.find({ $text: { $search: name } });
    if (users.length === 0) {
      users = await USER.find({
        $or: [{ name: regex }],
      });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  login,
  deleteUser,
  deactivateUser,
  updateUser,
  searchByName,
};
