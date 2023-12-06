import express, { Router, Request, Response } from "express";
import BookController from "../controllers/bookController";

const router: Router = express.Router();

router.get("/new", BookController.newBook);
router.get("/", BookController.viewBooks);
router.get("/:id", BookController.viewBook);
router.post("/", BookController.saveBook);
router.post("/:id", BookController.updateBook);
router.get("/:id/edit", BookController.editBook);
router.delete("/:id", BookController.deleteBook);

export default router;
