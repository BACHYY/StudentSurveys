import express from "express";
import SCHOOL from "../models/schoolModel.js";
import {
  registerSchool,
  deleteSchool,
  updateSchool,
  searchSchool,
} from "../controllers/schoolController.js";
// creating apis
const schoolRoutes = express.Router();

//API endpoint for creating a new user
// POST Request for creating a user
//Route /api/users
schoolRoutes.post("/", registerSchool);

//Log in Api
//Request type POST
//Route /api/users/login

//whenever we call a function that returns a promise,
//for that promise to be resolved, we have to wait using await keyword

// function().then(...)

//localhost:8000/api/users/4
schoolRoutes.delete("/delete/:id", deleteSchool);
schoolRoutes.put("/update/:id", updateSchool);
schoolRoutes.get("/search", searchSchool);

export default schoolRoutes;
