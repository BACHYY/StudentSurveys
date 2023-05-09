import asyncHandler from 'express-async-handler';
import { escapeRegex } from '../utils/utils.js';
import Course from '../models/courseModel.js';
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
        const professors = await Professor.find().populate({
            path: 'courses',
            match: { _id: course_id },
        });
        res.status(200).json({ professors });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export { searchCourse, getAllProfessorTeachingCourse };
