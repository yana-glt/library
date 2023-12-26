import express, { Request, Response, NextFunction } from "express";
import CustomRequest from "../middleware/customRequest";
import Book from "../models/book";
import Magazine from "../models/magazine";

class IndexController {
  public static getIndex = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const books = await Book.find().sort({ createdAt: "desc" }).limit(2).populate("author").populate("genre").exec();
      const magazines = await Magazine.find().sort({ createdAt: "desc" }).limit(2).populate("magazineType").exec();
      res.render("index", { books: books, magazines: magazines, user: user });
    } catch(err){
      return next(err);
    }     
  };

  public static getIcon = async (req: Request, res: Response, next: NextFunction) => {
    res.sendFile("favicon.ico", { root: __dirname });
  };
}

export default IndexController;
