import userModel from "../models/userModel.js";
import professorModel from "../models/professorModel.js";

export async function getUserBookmarkReviews(req, res) {
  try {
    const { userId } = req.params;

    // fetch bookmarked reviews from user document
    const bookmarkedReviews = await userModel
      .findById(userId)
      .select("bookmarkedReviews");

    // fetch ratings from professor document
    const bookmarkedProfessors = await professorModel.find({
      ratings: { $in: bookmarkedReviews },
    });

    // filter ratings from professor document
    const ratings = bookmarkedProfessors.reduce((arr, prof) => {
      const rightRatings = prof.ratings.filter((rating) =>
        bookmarkedReviews.includes(rating._id)
      );

      return [...arr, ...rightRatings];
    }, []);

    return ratings;
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
}

export async function addBookmarkReview(req, res) {
  try {
    const { userId, reviewId } = req.params;
    const updatedBookmarkedReviews = userModel
      .findByIdAndUpdate(userId, {
        $push: { bookmarkedReviews: reviewId },
      })
      .select("bookmarkedReviews");

    return updatedBookmarkedReviews;
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
}
