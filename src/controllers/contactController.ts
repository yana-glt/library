import express, { Router, Request, Response } from "express";
import Contact from "../models/contact";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class ContactController {
  public static getContact = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    res.render("contact/index", { user: user });
  };

  public static saveContact = async (req: CustomRequest, res: Response) => {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    try{
      const newContact = await contact.save();
      res.redirect("/");
    } catch(err){
      logger.error(err);
    }
  };
}

export default ContactController;
