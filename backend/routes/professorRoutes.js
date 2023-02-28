import express from "express";
import Professor from "../models/professorModel.js";
import {
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
} from "../controllers/profController.js";
import { protect } from "../middlewares/authMiddleware.js";
// creating apis
const professorRoutes = express.Router();

//API endpoint for creating a new user
// POST Request for creating a user
//Route /api/users
professorRoutes.post("/", registerProfessor);

//Log in Api
//Request type POST
//Route /api/users/login

//whenever we call a function that returns a promise,
//for that promise to be resolved, we have to wait using await keyword

// function().then(...)

professorRoutes.post("/login", loginProfessor);

//localhost:8000/api/users/4
professorRoutes.delete("/:id", deleteProfessor);
professorRoutes.put("/:id", deactivateProfessor);
professorRoutes.put("/update/:id", updateProfessor);
professorRoutes.get("/search", searchProfessors);
professorRoutes.post("/:id/rate", protect, createProfessorRating);
professorRoutes.put(
  "/:id/updateCourse/:courseId",
  protect,
  updateProfessorCourse
);
professorRoutes.delete(
  "/:id/updateCourse/:courseId",
  protect,
  deleteProfessorCourse
);
professorRoutes.get("/searchCourse", protect, searchProfCourses);

export default professorRoutes;
