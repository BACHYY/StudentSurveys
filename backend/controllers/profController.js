import PROFESSOR from "../models/professorModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { escapeRegex } from "../utils/utils.js";

const registerProfessor = asyncHandler(async (req, res) => {
  const { name, school, department, course, rating } = req.body;
  console.log(course);
  //findOne method from mongooose to get only one document
  //this method takes an object for where clause
  const profExists = await PROFESSOR.findOne({
    name: name,
    department: department,
  });
  console.log({ profExists });
  if (profExists) {
    res.status(400);
    throw new Error("Professor already exits");
  }
  //if the key value pairs are same , write like this
  const professor = {
    name,
    department,
    school,
    rating,
  };
  // professor.courses.push(course);
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  const createdProf = await PROFESSOR.create(professor);

  if (createdProf) {
    createdProf.courses.push(course);
    await createdProf.save();
    res.status(201).json({
      professor: createdProf,
      msg: "Professor added",
    });
  }
});

const loginProfessor = async (req, res) => {
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

const deleteProfessor = asyncHandler(async (req, res) => {
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

const deactivateProfessor = asyncHandler(async (req, res) => {
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

const updateProfessor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await USER.findById(id);
  if (user) {
    //if user opts to uptae it's name then we will get name from body
    //otherwise we use the same/existing name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

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
const searchProfessors = async (req, res, next) => {
  const search = req.query.s; // assuming the search query parameter is named 'name'
  const regex = new RegExp(escapeRegex(search), "gi");
  console.log({ search });
  try {
    // const users = await USER.find({ search: { $regex: search, $options: "i" } }); // using regex to search for searchs that contain the given search query
    // const users = await USER.find({ search: regex });
    let profs = await PROFESSOR.find({ $text: { $search: search } });
    console.log("fullText search");

    if (profs.length === 0) {
      console.log("regex search");
      profs = await PROFESSOR.find({
        $or: [{ name: regex }],
      });
    }
    res.status(200).json(profs);
  } catch (error) {
    next(error);
  }
};
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProfessorRating = asyncHandler(async (req, res) => {
  const { comment, clarityRating, difficultyRating, helpfulRating } = req.body;

  const professor = await PROFESSOR.findById(req.params.id);

  if (professor) {
    const alreadyReviewed = professor.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Professor already reviewed");
    }

    const rating = {
      name: req.user.name,
      clarityRating: Number(clarityRating),
      difficultyRating: Number(difficultyRating),
      helpfulRating: Number(helpfulRating),
      comment,
      user: req.user._id,
    };

    professor.ratings.push(rating);

    // product.numReviews = product.reviews.length;

    // product.rating =
    //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   product.reviews.length;

    await professor.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Professor not found");
  }
});
export {
  registerProfessor,
  loginProfessor,
  deleteProfessor,
  deactivateProfessor,
  updateProfessor,
  searchProfessors,
  createProfessorRating,
};
