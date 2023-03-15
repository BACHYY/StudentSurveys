import { Router } from "express";
import { addBookmarkReview, getUserBookmarkReviews } from "../controllers/bookmarkController.js";

const router = Router();

// CRUD

router.get("/reviews/:userId", getUserBookmarkReviews);
router.post("/reviews/:userId/:reviewId", addBookmarkReview);

export default router;
