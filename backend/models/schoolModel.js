import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
// defining a structure of school collection

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  clubsRating: { type: Number, required: false },
  socialRating: { type: Number, required: false },
  safetyRating: { type: Number, required: false },
  reputationRating: { type: Number, required: false },
  opportunitiesRating: { type: Number, required: false },
  locationRating: { type: Number, required: false },
  internetRating: { type: Number, required: false },
  happinessRating: { type: Number, required: false },
  foodRating: { type: Number, required: false },
  facilitiesRating: { type: Number, required: false },
  comment: { type: String, required: false },
  thumbsDownTotal: { type: Number, required: false },
  thumbsUpTotal: { type: Number, required: false },
  userThumbs: { type: Number, required: false },
  date: { type: Date, required: true },
});
const departmentSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: false },
});
const schoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    ratings: [ratingSchema],
    departments: [departmentSchema],
  },
  {
    timeStamps: true,
  }
);

const SCHOOL = mongoose.model("School", schoolSchema);

export default SCHOOL;
