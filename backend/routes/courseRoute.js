import express from 'express';
import { getAllProfessorTeachingCourse, searchCourse } from '../controllers/courseController.js';

const courseRoute = express.Router();

courseRoute.get('/search', searchCourse);

courseRoute.get('/professors/:course_id', getAllProfessorTeachingCourse);

export default courseRoute;
