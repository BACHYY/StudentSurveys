import { Router } from "express";
import { bookmarkProfessor } from "../controllers/bookmarksController";

const router = Router();

router.get("/bookmarkProfessor/:_id", bookmarkProfessor);
