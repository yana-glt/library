import express, { Router, Request, Response } from "express";
import Author from "../models/author";
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class AuthorController {
  public static viewAuthors = async (req: any, res: Response) => {
    this.renderAuthor(req, res);
  };

  public static viewAuthor = async (req: any, res: Response) => {
    const user = req.user;
    const author = await Author.findById(req.params.id);
    res.render("author/view", { author: author, user: user });
  };

  public static saveAuthor = async (req: Request, res: Response) => {
    const { name, country } = req.body;
    const author = new Author({ name, country });
    const newAuthor = await author.save();
    logger.info(`New author was successfully added to db: ${newAuthor}`);
    this.renderAuthor(req, res);
  };

  public static editAuthor = async (req: any, res: Response) => {
    const user = req.user;
    const author: any = await Author.findById(req.params.id);
    res.render("author/edit", { author: author, user: user });
  };

  public static newAuthor = (req: any, res: Response) => {
    const user = req.user;
    res.render("author/new", { author: new Author(), user: user });
  };

  public static updateAuthor = async (req: any, res: Response) => {
    const user = req.user;
    const author: any = await Author.findById(req.params.id);
    author.name = req.body.name;
    author.country = req.body.country;
    await author.save();
    logger.info(`Author was successfully updated to ${author}`);
    this.renderAuthor(req, res);
  };

  public static deleteAuthor = async (req: Request, res: Response) => {
    const id = req.params.id;
    const author = await Author.findOneAndDelete({ _id: id });
    logger.info(`Author was successfully deleted: ${author}`);
    this.renderAuthor(req, res);
  };

  private static async renderAuthor(req: any, res: any) {
    const user = req.user;
    let searchOption: any = {};
    const pattern = req.query.name || "";
    if (pattern) {
      searchOption.name = new RegExp(pattern, "i");
    }
    const authors: any = await Author.find(searchOption);
    res.render("author/index", {
      authors: authors,
      searchOption: req.query,
      user: user,
    });
  };
}

export default AuthorController;
