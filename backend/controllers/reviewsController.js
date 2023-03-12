import professorModel from "../models/professorModel.js";

export async function getProfessorReviews(req, res) {
  // get all reviews for a professor from mongodb
  try {
    const { _id } = req.params;

    const professor = await professorModel.findById(_id);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }
    return res.status(200).json({ reviews: professor.ratings });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}


export async function getUserReviews(req, res) {
  // get all reviews for a professor from mongodb
  try {
    const { userId } = req.params;

    const professors = await professorModel.find({
      "ratings.user": userId,
    });
    if (!professors.length) {
      return res.status(404).json({ error: "User Reviews not found" });
    }

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