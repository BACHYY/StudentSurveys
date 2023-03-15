import { Router } from "express";
import {
  forgotPassword,
  verifyAnswer,
  resetPassword
} from "../controllers/passwordController.js";

const router = Router();

// CRUD


// GET the security question
router.get("/forgot/:email", forgotPassword);


// POST: Verify the answer and send the 200 response
router.post("/verify/:email", verifyAnswer);

// PUT: Reset the password
router.put("/reset/:email", resetPassword);

export default router;
