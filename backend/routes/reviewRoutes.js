import { Router } from "express";
import {
  deleteUserReviews,
  getProfessorReviews,
  getUserReviews,
  replyToReview,
  voteAProfessorReview,
} from "../controllers/reviewsController.js";
import { admin } from "../middlewares/authMiddleware.js";

const router = Router();

// CRUD

router.get("/professorReviews/:_id", getProfessorReviews);

router.get("/userReviews/:_id", getUserReviews);

router.put("/vote/:professorId/:reviewId", voteAProfessorReview);

// responding to existing reviews
router.put("/reply/:professorId/:reviewId", replyToReview);

router.delete("/:professorId/:reviewId", admin, deleteUserReviews);

export default router;
