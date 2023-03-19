import { Router } from "express";
import {
  addBookmarkReview,
  getUserBookmarkReviews,
  removeBookmarkReview,
} from "../controllers/bookmarkController.js";

const router = Router();

// CRUD

router.get("/reviews/:userId", getUserBookmarkReviews);
router.post("/reviews/:userId/:reviewId", addBookmarkReview);
router.delete("/reviews/:userId/:reviewId", removeBookmarkReview);

export default router;
