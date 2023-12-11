import express, { Request, Response } from "express";
import Book from "../models/book";
import Author from "../models/author";
import CustomRequest from '../middleware/customRequest';

class BookController {
  public static viewBooks = (req: CustomRequest, res: Response) => {
    this.renderBook(req, res);
  };

  public static viewBook = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try {
      const book = await Book.findById(req.params.id).populate("author").exec();
      res.render("book/view", { book: book, user: user });
    } catch (error) {
      console.log(error);
    }
  };

  public static newBook = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try {
      const authors = await Author.find();
      res.render("book/new", {
        book: new Book(),
        authors: authors,
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static saveBook = async (req: CustomRequest, res: Response) => {
    console.log(req.body);
    console.log(req.files);
    try {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        description: req.body.description,
      });
      if (req.files) {
        book.cover = Buffer.from((req.files as any).cover.data, "base64");
        book.coverType = (req.files as any).cover.mimetype;
      }
      const newBook = await book.save();
      const author = await Author.findById(newBook.author);
      if (author) {
        author.books.push(newBook.id);
        await author.save();
      }
      res.redirect("book");
      console.log(newBook);
    } catch (error) {
      console.log(error);
    }
  };

  public static updateBook = async (req: CustomRequest, res: Response) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.publishDate = req.body.publishDate;
        book.pageCount = req.body.pageCount;
        book.description = req.body.description;
        if (req.files) {
          book.cover = Buffer.from((req.files as any).cover.data, "base64");
          book.coverType = (req.files as any).cover.mimetype;
        }
        const savedBook = await book.save();
        const author = await Author.findById(savedBook.author);
        if (author && book.author != savedBook.author) {
          author.books.push(savedBook.id);
          await author.save();
        }
        this.renderBook(req, res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  public static editBook = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try {
      const authors = await Author.find({});
      const book = await Book.findById(req.params.id);
      res.render("book/edit", { book: book, authors: authors, user: user });
    } catch (error) {
      console.log(error);
    }
  };

  public static deleteBook = async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    try {
      const book = await Book.findById({ _id: id });
      if (book) {
        const author = await Author.findById(book.author);
        if (author) {
          author.books.splice(author.books.indexOf(book.author), 1);
          await author.save();
        }
        await Book.findOneAndDelete({ _id: id });
        this.renderBook(req, res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  private static async renderBook(req: CustomRequest, res: Response) {
    const user = req.user;
    try {
      let searchOption: any = {};
      const pattern: any = req.query.title || "";
      if (pattern) {
        searchOption.title = new RegExp(pattern, "i");
      }
      console.log(searchOption);
      const books = await Book.find(searchOption).populate("author").exec();
      console.log(books);
      res.render("book/index", {
        books: books,
        searchOption: req.query,
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default BookController;
