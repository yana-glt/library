import express, { Response, NextFunction } from "express";
import Genre from "../models/genre";
import Book from "../models/book";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class GenreController {
  public static viewGenres = (req: CustomRequest, res: Response, next: NextFunction) => {
    this.renderGenre(req, res, next);
  };

  public static viewGenre = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const genre = await Genre.findById(req.params.id);
      const booksIdList = genre?.books || [];
      const books = [];
      for(let i = 0; i < booksIdList?.length; i++){
        const book = await Book.findById(booksIdList[i]).populate("author").populate("genre").exec();
        books.push(book);
      }
      res.render("genre/view", { genre: genre, user: user, books: books });
    } catch(err){
      return next(err);
    } 
  };

  public static saveGenre = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const genre = new Genre({ name, description });
    try{
      const newGenre = await genre.save();
      this.renderGenre(req, res, next);
      logger.info(`New genre was successfully added to db: ${newGenre}`);
    } catch(err){
      return next(err);
    } 
  };

  public static editGenre = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const genre = await Genre.findById(req.params.id);
      res.render("genre/edit", { genre: genre, user: user });
    } catch(err){
      return next(err);
    }     
  };

  public static newGenre = (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    res.render("genre/new", { author: new Genre(), user: user });
  };

  public static updateGenre = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const genre: any = await Genre.findById(req.params.id);
      genre.name = req.body.name;
      genre.description = req.body.description;
      await genre.save();
      logger.info(`Genre was successfully updated to ${genre}`);
      this.renderGenre(req, res, next);
    } catch(err){
      return next(err);
    }
  };

  public static deleteGenre = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
      const genre = await Genre.findOneAndDelete({ _id: id });
      logger.info(`Genre was successfully deleted: ${genre}`);
      this.renderGenre(req, res, next);
    } catch(err){
      return next(err);
    }
  };

  private static async renderGenre(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    let searchOption: any = {};
    const pattern: any = req.query.name || "";
    if (pattern) {
      searchOption.name = new RegExp(pattern, "i");
    }
    try{
      const genres = await Genre.find(searchOption);
      res.render("genre/index", { genres: genres, searchOption: req.query, user: user });
    } catch(err){
      return next(err);
    }  
  };
}

export default GenreController;
