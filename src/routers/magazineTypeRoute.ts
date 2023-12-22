import express, { Router, Request, Response } from "express";
import MagazineTypeController from "../controllers/magazineTypeController";

const router: Router = express.Router();

router.get("/new", MagazineTypeController.newMagazineType);
router.get("/", MagazineTypeController.viewMagazineTypes);
router.get("/:id", MagazineTypeController.viewMagazineType);
router.get("/:id/edit", MagazineTypeController.editMagazineType);
router.post("/", MagazineTypeController.saveMagazineType);
router.post("/:id", MagazineTypeController.updateMagazineType);
router.delete("/:id", MagazineTypeController.deleteMagazineType);

export default router;