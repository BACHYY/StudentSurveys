import { Router } from "express";
import {
  getProfessorReviews,
  getUserReviews,
  deleteUserReviews,
  voteAProfessorReview,
  replyToReview,
} from "../controllers/reviewsController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

// CRUD

router.get("/professorReviews/:_id", getProfessorReviews);
router.get("/userReviews/:userId", getUserReviews);
router.put("/vote/:professorId/:reviewId", voteAProfessorReview);

// responding to existing reviews
router.put("/reply/:professorId/:reviewId", replyToReview);

router.delete("/:professorId/:reviewId", admin, deleteUserReviews);

export default router;
