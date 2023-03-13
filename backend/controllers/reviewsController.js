import professorModel from "../models/professorModel.js";
import Mongoose from 'mongoose';

export async function getProfessorReviews(req, res) {
  // get all reviews for a professor from mongodb
  try {
    // we are destructuring the id from request parameter
    const { _id } = req.params;
    //  we find professor by id
    const professor = await professorModel.findById(_id);
    //  if professor is not found return error
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }
    // otherwise return we store professor ratings in reviews and return that.
    return res.status(200).json({ reviews: professor.ratings });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getUserReviews(req, res) {
  // get all reviews for a USER from mongodb
  try {
    // we get userId from request parameter
    const { userId } = req.params;
    // get all professors that have a review by a user
    // we use simple find function and navigate through the ratings object and find property called user.
    //  that has a user id.
    const professors = await professorModel.find({
      "ratings.user": Mongoose.Types.ObjectId(userId),
    });

    // Why professors.length?
    if (!professors.length) {
      return res.status(404).json({ error: "User Reviews not found" });
    }
    // didn't understand this part!
    const reviews = professors.reduce((accumulator, professor) => {
      const userReviews = professor.ratings.filter(
        (rating) => rating.user.toString() === userId
      );
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
    let fieldName = "";
    if (voteType === "up") {
      fieldName = "upVotes";
    } else if (voteType === "down") {
      fieldName = "downVotes";
    } else {
      return res.status(400).json({ error: "Invalid vote type" });
    }

    const updatedReview = await professorModel.updateOne(
      { _id: professorId, "ratings._id": reviewId },
      { $inc: { ["ratings.$."+fieldName]: 1 } },
    );
    return res.status(200).json({ reviews: updatedReview });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function replyToReview(req, res) {
  try {
    const {
      professorId,
      reviewId,
    } = req.params
    const {comment} = req.body;

    if (!comment){
      return res.status(400).json({error: "Comment is required"})
    }
    
    const reply = {
      comment,
      upVotes: 0,
      downVotes: 0,
    }
    // add reply to review
    const updatedProfessor = await professorModel.updateOne(
      { _id: professorId, "ratings._id": reviewId },
      { $push: { "ratings.$.replies": reply} }
    );

    return res.status(200).json({ reviews: updatedProfessor?.ratings });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function deleteUserReviews(req, res) {
  try {
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
