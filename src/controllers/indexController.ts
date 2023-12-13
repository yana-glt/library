import express, { Router, Request, Response } from "express";
import CustomRequest from "../middleware/customRequest";
import Book from "../models/book";

class IndexController {
  public static getIndex = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    if (user) {
      const books = await Book.find().sort({ createdAt: "desc" }).limit(2).populate("author").exec();
      res.render("index", { books: books, user: user });
    } else {
      throw Error("User not found");
    }
  };

  public static getIcon = async (req: any, res: Response) => {
    res.sendFile("favicon.ico", { root: __dirname });
  };
}

export default IndexController;
