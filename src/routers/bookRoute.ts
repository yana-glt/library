import express, { Router, Request, Response } from "express";
import BookController from "../controllers/bookController";
import ReviewController from "../controllers/reviewController";

const router: Router = express.Router();

router.get("/new", BookController.newBook);
router.get("/", BookController.viewBooks);
router.get("/:id", BookController.viewBook);
router.post("/", BookController.saveBook);
router.post("/:id", BookController.updateBook);
router.get("/:id/edit", BookController.editBook);
router.delete("/:id", BookController.deleteBook);

router.get("/:id/review", ReviewController.viewReviews);
router.get("/:id/review/new", ReviewController.newReview);
router.post("/:id/review", ReviewController.saveReview);

export default router;

