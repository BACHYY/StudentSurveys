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
  addProfessorCourse,
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
professorRoutes.delete("/delete/:id", deleteProfessor);
professorRoutes.put("/deactivate/:id", deactivateProfessor);
professorRoutes.put("/update/:id", updateProfessor);
professorRoutes.get("/search", searchProfessors);
professorRoutes.post("/:id/rate", protect, createProfessorRating); // whenever we have a protected route, they need to have a token.
professorRoutes.put(
  "/:id/updateCourse/:courseId",
  protect,
  updateProfessorCourse
);
professorRoutes.delete(
  "/:id/deleteCourse/:courseId",
  protect,
  deleteProfessorCourse
);
professorRoutes.get("/searchCourse", searchProfCourses);
professorRoutes.post("/addCourse/:id", protect, addProfessorCourse);

export default professorRoutes;
