import mongoose from 'mongoose';

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
        isDeleted: {
            type: Boolean,
            default: false,
        },

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

const Rating = mongoose.model('Review', ratingSchema);
export default Rating;
