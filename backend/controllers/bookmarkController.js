import professorModel from '../models/professorModel.js';
import USER from '../models/userModel.js';

export async function getUserBookmarkReviews(req, res) {
    try {
        const { _id } = req.params;

        // fetch bookmarked reviews from user document
        const user = await USER.findById(_id).populate('bookmarkedReviews');

        // fetch ratings from professor document
        // const bookmarkedProfessors = await professorModel.find({
        //   "ratings._id": { $in: user.bookmarkedReviews },
        // });

        // // filter ratings from professor document
        // const ratings = bookmarkedProfessors.reduce((arr, prof) => {
        //   const rightRatings = prof.ratings.filter((rating) =>
        //     user.bookmarkedReviews.includes(rating._id)
        //   );

        //   return [...arr, ...rightRatings];
        // }, []);

        return res.status(200).json({ reviews: user.bookmarkedReviews });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

export async function addBookmarkReview(req, res) {
    try {
        const { userId, reviewId } = req.params;

        await USER.findOneAndUpdate({ _id: userId }, { $push: { bookmarkedReviews: reviewId } });
        const resultUser = await USER.findById(userId).populate('bookmarkedReviews');
        return res.status(200).json(resultUser);
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

export async function removeBookmarkReview(req, res) {
    try {
        const { userId, reviewId } = req.params;
        const filteredReviews = await USER.findOneAndUpdate(
            { _id: userId },
            { $pull: { bookmarkedReviews: reviewId } }
        );

        return res.status(200).json({ reviews: filteredReviews });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}
