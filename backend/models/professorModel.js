import mongoose from "mongoose";
// defining a structure of professors collection

const courseSchema = mongoose.Schema({
  courseName: { type: String, required: true },
  courseCount: { type: String, required: true },
});
const ratingSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: String, required: false },
    clarityRating: { type: Number, required: false },
    difficultyRating: { type: Number, required: false },
    helpfulRating: { type: Number, required: false },
    name: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    },
    department: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    courses: [courseSchema],
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

const PROFESSOR = mongoose.model("Professors", professorSchema);

export default PROFESSOR;
