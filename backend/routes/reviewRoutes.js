import { Router } from 'express';
import {
    deleteUserReviews,
    getDeletedReviews,
    getProfessorReviews,
    getUserReviews,
    replyToReview,
    restoreDeletedReview,
    voteAProfessorReview,
} from '../controllers/reviewsController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = Router();

// CRUD

router.get('/professorReviews/:_id', getProfessorReviews);

router.get('/userReviews/:_id', getUserReviews);

router.put('/vote/:professorId/:reviewId', protect, voteAProfessorReview);

// responding to existing reviews
router.put('/reply/:professorId/:reviewId', replyToReview);

router.delete('/:professorId/:reviewId', admin, deleteUserReviews);

router.put('/restore/:reviewId', admin, restoreDeletedReview);

router.get('/deleted', admin, getDeletedReviews);

export default router;
