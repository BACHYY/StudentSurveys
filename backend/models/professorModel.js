import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
// defining a structure of user collection

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true },
});
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
