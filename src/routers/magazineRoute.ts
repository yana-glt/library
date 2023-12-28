import express, { Router, Request, Response } from "express";
import MagazineController from "../controllers/magazineController";

const router: Router = express.Router();

router.get("/new", MagazineController.newMagazine);
router.get("/", MagazineController.viewMagazines);
router.get("/:id", MagazineController.viewMagazine);
router.post("/", MagazineController.saveMagazine);
router.post("/:id", MagazineController.updateMagazine);
router.get("/:id/edit", MagazineController.editMagazine);
router.delete("/:id", MagazineController.deleteMagazine);

export default router;