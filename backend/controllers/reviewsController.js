import Mongoose from 'mongoose';
import professorModel from '../models/professorModel.js';
import mongoose from 'mongoose';

export async function getProfessorReviews(req, res) {
    // get all reviews for a professor from mongodb
    try {
        // we are destructuring the id from request parameter
        const { _id } = req.params;
        //  we find professor by id
        const professor = await professorModel.findById(_id);
        //  if professor is not found return error
        if (!professor) {
            return res.status(404).json({ error: 'Professor not found' });
        }

        const ratingLevel = {
            One: 0,
            Two: 0,
            Three: 0,
            Four: 0,
            Five: 0,
        };

        const ratings_aggregate = {
            totalRatings: 0,
            total: professor.ratings.length,
            avg_rating: 5,
        };

        professor.ratings.forEach((rating) => {
            let x = rating.ratingValue;
            ratings_aggregate.totalRatings += x;

            ratings_aggregate.avg_rating =
                Math.round((ratings_aggregate.totalRatings / ratings_aggregate.total) * 2) / 2;
            if (x > 0 && x <= 1) {
                ratingLevel.One += 1;
            } else if (x > 1 && x <= 2) {
                ratingLevel.Two += 1;
            } else if (x > 2 && x <= 3) {
                ratingLevel.Three += 1;
            } else if (x > 3 && x <= 4) {
                ratingLevel.Four += 1;
            } else if (x > 4 && x <= 5) {
                ratingLevel.Five += 1;
            }
        });

        Object.keys(ratingLevel).forEach((key) => {
            ratingLevel[key] = Math.round((ratingLevel[key] / ratings_aggregate.total) * 100 * 2) / 2;
        });

        const finalRatings = {
            total: ratings_aggregate.total,
            averageRating: ratings_aggregate.avg_rating,
            options: [
                {
                    title: '1-star',
                    rating_percentage: ratingLevel.One,
                },
                {
                    title: '2-star',
                    rating_percentage: ratingLevel.Two,
                },
                {
                    title: '3-star',
                    rating_percentage: ratingLevel.Three,
                },
                {
                    title: '4-star',
                    rating_percentage: ratingLevel.Four,
                },
                {
                    title: '5-star',
                    rating_percentage: ratingLevel.Five,
                },
            ],
        };
        console.log(finalRatings);
        // otherwise return we store professor ratings in reviews and return that.
        return res.status(200).json({ reviews: professor.ratings, rating: finalRatings });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function getUserReviews(req, res) {
    try {
        const { _id } = req.params;
        const professors = await professorModel.find({
            'ratings.user': Mongoose.Types.ObjectId(_id),
        });

        // Why professors.length?
        if (!professors.length) {
            return res.status(404).json({ error: 'User Reviews not found' });
        }
        // didn't understand this part!
        const reviews = professors.reduce((accumulator, professor) => {
            const userReviews = professor.ratings.filter((rating) => rating.user.toString() === _id);
            return accumulator.concat(userReviews);
        }, []);

        return res.status(200).json({ reviews });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function voteAProfessorReview(req, res) {
    try {
        const { professorId, reviewId } = req.params;
        const { voteType } = req.query;
        //  we are making field name to make our querry more dynamic
        let fieldName = '';
        if (voteType === 'up') {
            fieldName = 'upVotes';
        } else if (voteType === 'down') {
            fieldName = 'downVotes';
        } else {
            return res.status(400).json({ error: 'Invalid vote type' });
        }

        const updatedReview = await professorModel.updateOne(
            { _id: professorId, 'ratings._id': reviewId },
            //  inc means increment
            { $inc: { ['ratings.$.' + fieldName]: 1 } }
        );
        return res.status(200).json({ reviews: updatedReview });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function replyToReview(req, res) {
    try {
        const { professorId, reviewId } = req.params;
        const { comment, name } = req.body;

        if (!comment) {
            return res.status(400).json({ error: 'Comment is required' });
        }

        const reply = {
            comment,
            name,
            upVotes: 0,
            downVotes: 0,
        };
        // add reply to review
        const updatedProfessor = await professorModel.updateOne(
            { _id: professorId, 'ratings._id': reviewId },
            { $push: { 'ratings.$.replies': reply } }
        );

        return res.status(200).json({ reviews: updatedProfessor?.ratings });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function deleteUserReviews(req, res) {
    try {
        // destructure professor Id and reviewId
        const { professorId, reviewId } = req.params;

        const filteredReviews = await professorModel.findOneAndUpdate(
            { _id: professorId },
            { $pull: { ratings: { _id: reviewId } } }
        );

        return res.status(200).json({ reviews: filteredReviews });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
