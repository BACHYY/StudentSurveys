import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true, index: true, unique: true },
    courseCount: { type: Number, required: true },
});

courseSchema.index({
    courseName: 'text',
});
const Course = mongoose.model('Course', courseSchema);

export default Course;
