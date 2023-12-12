import express, { Request, Response } from "express";
import Author from "../models/author";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class AuthorController {
  public static viewAuthors = (req: CustomRequest, res: Response) => {
    this.renderAuthor(req, res);
  };

  public static viewAuthor = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try{
      const author = await Author.findById(req.params.id);
      res.render("author/view", { author: author, user: user });
    } catch(error){
      logger.error(error);
    }
    
  };

  public static saveAuthor = async (req: CustomRequest, res: Response) => {
    const { name, country } = req.body;
    const author = new Author({ name, country });
    try{
      const newAuthor = await author.save();
      this.renderAuthor(req, res);
      logger.info(`New author was successfully added to db: ${newAuthor}`);
    } catch(error){
      logger.error(error);
    } 
  };

  public static editAuthor = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try{
      const author = await Author.findById(req.params.id);
      res.render("author/edit", { author: author, user: user });
    } catch(error){
      logger.error(error);
    }     
  };

  public static newAuthor = (req: CustomRequest, res: Response) => {
    const user = req.user;
    res.render("author/new", { author: new Author(), user: user });
  };

  public static updateAuthor = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try{
      const author: any = await Author.findById(req.params.id);
      author.name = req.body.name;
      author.country = req.body.country;
      await author.save();
      logger.info(`Author was successfully updated to ${author}`);
      this.renderAuthor(req, res);
    } catch(err){
      logger.error(err);
    }
  };

  public static deleteAuthor = async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    try{
      const author = await Author.findOneAndDelete({ _id: id });
      logger.info(`Author was successfully deleted: ${author}`);
      this.renderAuthor(req, res);
    } catch(err){
      logger.error(err);
    }
  };


  private static async renderAuthor(req: CustomRequest, res: Response) {
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
      logger.error(err);
    }  
  }
}

export default AuthorController;
