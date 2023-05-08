import mongoose from 'mongoose';
// defining a structure of professors collection

const repliesSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: String, required: false },
    name: { type: String, required: false },
    upVotes: { type: Number, required: false },
    downVotes: { type: Number, required: false },
});
const ratingSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        comment: { type: String, required: false },
        ratingValue: { type: Number, required: true },
        upVotes: { type: Number, required: false },
        downVotes: { type: Number, required: false },
        name: { type: String, required: false },
        profName: { type: String, required: false },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        replies: [repliesSchema],
    },
    {
        timestamps: true,
    }
);

const professorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        department: {
            type: String,
            index: true,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        courses: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Course',
            },
        ],
        ratings: [ratingSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timeStamps: true,
    }
);

professorSchema.index({
    name: 'text',
    department: 'text',
    weights: {
        name: 5,
        department: 1,
    },
});

const PROFESSOR = mongoose.model('Professors', professorSchema);

export default PROFESSOR;
