import { Router } from 'express';
import { getProfessorReviews, getUserReviews } from '../controllers/reviewsController';


const router = Router();

// CRUD

router.get('/professor/:_id', getProfessorReviews)
router.get('/user/:_id', getUserReviews)



export default router;
