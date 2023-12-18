import express, { Router, Request, Response } from "express";
import GenreController from "../controllers/genreController";

const router: Router = express.Router();

router.get("/new", GenreController.newGenre);
router.get("/", GenreController.viewGenres);
router.get("/:id", GenreController.viewGenre);
router.get("/:id/edit", GenreController.editGenre);
router.post("/", GenreController.saveGenre);
router.post("/:id", GenreController.updateGenre);
router.delete("/:id", GenreController.deleteGenre);

export default router;