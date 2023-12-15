import express, { Response, NextFunction } from "express";
import Author from "../models/author";
import Book from "../models/book";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class AuthorController {
  public static viewAuthors = (req: CustomRequest, res: Response, next: NextFunction) => {
    this.renderAuthor(req, res, next);
  };

  public static viewAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const author = await Author.findById(req.params.id);
      const booksIdList = author?.books || [];
      const books = [];
      for(let i = 0; i < booksIdList?.length; i++){
        const book = await Book.findById(booksIdList[i]).populate("author").populate("genre").exec();
        books.push(book);
      }
      res.render("author/view", { author: author, user: user, books: books });
    } catch(err){
      return next(err);
    } 
  };

  public static saveAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, country } = req.body;
    const author = new Author({ name, country });
    try{
      const newAuthor = await author.save();
      this.renderAuthor(req, res, next);
      logger.info(`New author was successfully added to db: ${newAuthor}`);
    } catch(err){
      return next(err);
    } 
  };

  public static editAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const author = await Author.findById(req.params.id);
      res.render("author/edit", { author: author, user: user });
    } catch(err){
      return next(err);
    }     
  };

  public static newAuthor = (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    res.render("author/new", { author: new Author(), user: user });
  };

  public static updateAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const author: any = await Author.findById(req.params.id);
      author.name = req.body.name;
      author.country = req.body.country;
      await author.save();
      logger.info(`Author was successfully updated to ${author}`);
      this.renderAuthor(req, res, next);
    } catch(err){
      return next(err);
    }
  };

  public static deleteAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
      const author = await Author.findOneAndDelete({ _id: id });
      logger.info(`Author was successfully deleted: ${author}`);
      this.renderAuthor(req, res, next);
    } catch(err){
      return next(err);
    }
  };


  private static async renderAuthor(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    let searchOption: any = {};
    const pattern: any = req.query.name || "";
    if (pattern) {
      searchOption.name = new RegExp(pattern, "i");
    }
    try{
      const authors = await Author.find(searchOption);
      res.render("author/index", { authors: authors, searchOption: req.query, user: user });
    } catch(err){
      return next(err);
    }  
  };
}

export default AuthorController;
