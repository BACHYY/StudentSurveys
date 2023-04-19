import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import PROFESSOR from "../models/professorModel.js";
import { escapeRegex } from "../utils/utils.js";

const registerProfessor = asyncHandler(async (req, res) => {
  const { name, school, department } = req.body;
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
  };
  // professor.courses.push(course);
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  const createdProf = await PROFESSOR.create(professor);

  if (createdProf) {
    await createdProf.save();
    res.status(201).json({
      professor: createdProf,
      msg: "Professor added successfully",
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
  const professor = await PROFESSOR.findById(id);
  if (professor) {
    await professor.remove();
    res.json({
      message: "Professor removed",
    });
  } else {
    res.status(404);
    res.json({
      error: "Professor not found",
    });
  }
});

const deactivateProfessor = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const professor = await PROFESSOR.findById(id);
  if (professor) {
    professor.isActive = false;
    await professor.save();
    res.json({
      message: "Professor deactivated",
    });
  } else {
    res.status(404);
    res.json({
      error: "Professor not found",
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
  const professor = await PROFESSOR.findById(id);
  if (professor) {
    //if user opts to uptae it's name then we will get name from body
    //otherwise we use the same/existing name
    professor.name = req.body.name || professor.name;
    professor.department = req.body.department || professor.department;
    professor.school = req.body.school || professor.school;

    const updatedProf = await professor.save();

    res.json({
      message: "Professor details updated successfully",
      professor: updatedProf,
    });
  } else {
    res.status(404);
    res.json({
      error: "Profesor not found",
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
  const search = req.query.name; // assuming the search query parameter is named 'name'
  const regex = new RegExp(escapeRegex(search), "gi"); // this makes regex and is provided to the find function to search professors by name
  console.log({ search });
  try {
    // const users = await USER.find({ search: { $regex: search, $options: "i" } }); // using regex to search for searchs that contain the given search query
    // const users = await USER.find({ search: regex });
    let profs = await PROFESSOR.find({ $text: { $search: search } });

    console.log({ profs });
    console.log("fullText search");

    if (profs.length === 0) {
      console.log("regex search");
      console.log(regex);
      profs = await PROFESSOR.find({
        $or: [{ name: regex }],
      });
    }
    res.status(200).json(profs);
  } catch (error) {
    next(error);
  }
};
// @desc    Create new rating
// @route   POST /api/prof/:id/rate
// @access  Private
const createProfessorRating = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const professor = await PROFESSOR.findById(req.params._id);

  if (professor) {
    const alreadyReviewed = professor.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Professor already reviewed");
    }

    const rating = {
      _id: mongoose.Types.ObjectId(),
      name: req.user.name,
      upVotes: 0,
      downVotes: 0,
      comment,
      user: req.user._id,
      replies: [],
    };

    professor.ratings.push(rating);

    await professor.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Professor not found");
  }
});

const addProfessorCourse = asyncHandler(async (req, res) => {
  const { courseName, courseCount } = req.body;
  if (!courseName || !courseCount) {
    throw new Error("Course name and course count are required");
  }
  const course = { courseName, courseCount };
  const { id } = req.params;
  console.log(id);
  let professor = await PROFESSOR.findById(id);

  if (professor) {
    console.log(professor);

    const courseExist = professor.courses.find(
      (c) => c.courseName.toLowerCase() === courseName.toLowerCase()
    );
    if (courseExist) {
      throw new Error("Course already exists");
    }
    // the professor has courses array , we have to find the course that we are gonna update,
    //we use find method, and match the courseId from params to the professors course

    professor.courses.push(course);

    await professor.save();
    res.status(201).json({ message: "Course added successfully" });
  } else {
    res.status(404);
    throw new Error("Professor not found");
  }
});
const updateProfessorCourse = asyncHandler(async (req, res) => {
  const { courseName } = req.body;
  const { id, courseId } = req.params;
  console.log(id, courseId);
  let professor = await PROFESSOR.findById(req.params.id);

  if (professor) {
    console.log(professor);
    // the professor has courses array , we have to find the course that we are gonna update,
    //we use find method, and match the courseId from params to the professors course
    const course = professor.courses.find(
      (c) => c._id.toString() === courseId.toString()
    );
    console.log({ course });
    course.courseName = courseName;

    await professor.save();
    res.status(201).json({ message: "Course updated" });
  } else {
    res.status(404);
    throw new Error("Professor not found");
  }
});
const deleteProfessorCourse = asyncHandler(async (req, res) => {
  const { id, courseId } = req.params;
  console.log(id, courseId);
  let professor = await PROFESSOR.findById(req.params.id);

  if (professor) {
    console.log(professor);
    const course = professor.courses.find(
      (c) => c._id.toString() === courseId.toString()
    );

    professor.courses = professor.courses.filter(
      (c) => c._id.toString() === course._id.toString
    );
    console.log({ course });

    await professor.save();
    res.status(201).json({ message: "Course deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Professor not found");
  }
});
const searchProfCourses = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const { profId, search } = req.query;
  let professor = await PROFESSOR.findById(profId);

  if (professor) {
    console.log(professor);
    const courses = professor.courses.filter((c) =>
      c.courseName.toLowerCase().includes(search.toLowerCase())
    );
    await professor.save();
    res.status(200).json({ courses, message: "success" });
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
  updateProfessorCourse,
  deleteProfessorCourse,
  searchProfCourses,
  addProfessorCourse,
};
