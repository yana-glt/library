import express, { Router, Request, Response } from "express";
import ContactController from "../controllers/contactController";

const router: Router = express.Router();

router.get("/", ContactController.getContact);
router.post("/", ContactController.saveContact);

export default router;
