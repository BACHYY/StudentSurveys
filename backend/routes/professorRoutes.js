import express from "express";
import Professor from "../models/professorModel.js";
import {
  registerProfessor,
  loginProfesor,
  deleteProfessor,
  deactivateProfessor,
  updateProfessor,
} from "../controllers/profController.js";
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

professorRoutes.post("/login", loginProfesor);

//localhost:8000/api/users/4
professorRoutes.delete("/:id", deleteProfessor);
professorRoutes.put("/:id", deactivateProfessor);
professorRoutes.put("/update/:id", updateProfessor);

export default professorRoutes;
