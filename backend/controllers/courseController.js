import asyncHandler from 'express-async-handler';
import { escapeRegex } from '../utils/utils.js';
import Course from '../models/courseModel.js';
import PROFESSOR from '../models/professorModel.js';
import mongoose from 'mongoose';
// searching course query: search

const searchCourse = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const regex = new RegExp(escapeRegex(search), 'gi');

    try {
        let courses = await Course.find({ $text: { $search: search } });

        if (courses.length === 0) {
            courses = await Course.find({
                $or: [{ courseName: regex }],
            });
        }
        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// list professors teaching the particular course

const getAllProfessorTeachingCourse = asyncHandler(async (req, res) => {
    const { course_id } = req.params;

    try {
        const course = await Course.findById(course_id);
        if (course) {
            const professors = await PROFESSOR.find({ courses: course_id });
            res.status(200).json({ course, professors });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export { searchCourse, getAllProfessorTeachingCourse };
