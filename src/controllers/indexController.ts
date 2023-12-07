import express, { Router, Request, Response } from "express";
import User from "../models/user";

class IndexController {
  public static getIndex = (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = User.findById(id);
      if (user) {
        res.render("index", { user: user });
      } else {
        throw Error("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default IndexController;
