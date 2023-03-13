import professorModel from "../models/professorModel.js";

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
      "ratings.user": userId,
    });
    // Why professors. length?
    if (!professors.length) {
      return res.status(404).json({ error: "User Reviews not found" });
    }
    //  didn't understand this part!
    const reviews = professors.reduce((accumulator, professor) => {
      const userReviews = professor.ratings.filter(
        (rating) => rating.user.toString() === userId
      );
      return [...accumulator, ...userReviews];
    }, []);

    return res.status(200).json({ reviews });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function deleteUserReviews(req, res) {
  try {
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
