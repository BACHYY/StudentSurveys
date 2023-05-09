import asyncHandler from 'express-async-handler';
import { escapeRegex } from '../utils/utils';
import Course from '../models/courseModel';
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

// adding course for professor in professor controller

// searching course of particular
// list professors teaching the particular course

export { searchCourse };
