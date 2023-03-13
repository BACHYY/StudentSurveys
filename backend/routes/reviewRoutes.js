import { Router } from "express";
import {
  getProfessorReviews,
  getUserReviews,
  deleteUserReviews,
} from "../controllers/reviewsController.js";

const router = Router();

// CRUD

router.get("/professorReviews/:_id", getProfessorReviews);
router.get("/userReviews/:_id", getUserReviews);
router.delete("/:reviewId", deleteUserReviews);

export default router;
