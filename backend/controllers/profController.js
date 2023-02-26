import PROFESSOR from "../models/professorModel.js";
import asyncHAndler from "express-async-handler";
import bcrypt from "bcryptjs";
const registerProfessor = async (req, res) => {
  const { name, school, department, courses } = req.body;

  //findOne method from mongooose to get only one document
  //this method takes an object for where clause
  const profExists = await PROFESSOR.findOne({
    name: name,
    department: department,
  });
  console.log({ profExists });
  if (profExists) {
    res.status(400).json({
      error: "Professor already exits",
    });
  }
  //if the key value pairs are same , write like this
  const professor = {
    name,
    department,
    courses,
    school,
  };
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  try {
    const createdProf = await PROFESSOR.create(professor);

    if (createdProf) {
      res.status(201).json({
        professor: createdProf,
        msg: "Professor added",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginProfesor = async (req, res) => {
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

const deleteProfessor = asyncHAndler(async (req, res) => {
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

const deactivateProfessor = asyncHAndler(async (req, res) => {
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

const updateProfessor = asyncHAndler(async (req, res) => {
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

export {
  registerProfessor,
  loginProfesor,
  deleteProfessor,
  deactivateProfessor,
  updateProfessor,
};
