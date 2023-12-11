import express, { Request, Response } from "express";
import Author from "../models/author";

class AuthorController {
  public static viewAuthors = async (req: Request, res: Response) => {
    this.renderAuthor(req, res);
  };

  public static viewAuthor = async (req: Request, res: Response) => {
    const user = req.user;
    const email = req.body.email;
    console.log(email);
    try {
      const author = await Author.findById(req.params.id);
      res.render("author/view", { author: author, user: user });
    } catch (error) {
      console.log(error);
    }
  };

  public static saveAuthor = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, country } = req.body;
    const author = new Author({ name, country });
    try {
      const newAuthor = await author.save();
      this.renderAuthor(req, res);
      console.log(newAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  public static editAuthor = async (req: Request, res: Response) => {
    const user = req.user;
    try {
      const author = await Author.findById(req.params.id);
      res.render("author/edit", { author: author, user: user });
    } catch (error) {
      console.log(error);
    }
  };

  public static newAuthor = (req: Request, res: Response) => {
    const user = req.user;
    res.render("author/new", { author: new Author(), user: user });
  };

  public static updateAuthor = async (req: Request, res: Response) => {
    const user = req.user;
    try {
      const author: any = await Author.findById(req.params.id);
      author.name = req.body.name;
      author.country = req.body.country;
      await author.save();
      this.renderAuthor(req, res);
    } catch (error) {
      console.log(error);
    }
  };

  public static deleteAuthor = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const author = await Author.findOneAndDelete({ _id: id });
      this.renderAuthor(req, res);
    } catch (error) {
      console.log(error);
    }
  };

  private static async renderAuthor(req: Request, res: Response) {
    const user = req.user;
    let searchOption: any = {};
    const pattern: any = req.query.name || "";
    if (pattern) {
      searchOption.name = new RegExp(pattern, "i");
    }
    try {
      const authors = await Author.find(searchOption);
      console.log(authors);
      res.render("author/index", {
        authors: authors,
        searchOption: req.query,
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthorController;
