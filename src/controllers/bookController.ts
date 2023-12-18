import express, { Response, NextFunction } from "express";
import Book from "../models/book";
import Author from "../models/author";
import Genre from "../models/genre";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class BookController {
  public static viewBooks = (req: CustomRequest, res: Response, next: NextFunction) => {
    this.renderBook(req, res, next);
  };

  public static viewBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const book = await Book.findById(req.params.id).populate("author").populate("genre").exec();
      res.render("book/view", { book: book, user: user });
    } catch(err){
      return next(err);
    }   
  };

  public static newBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const authors = await Author.find();
      const genres = await Genre.find();
      res.render("book/new", { book: new Book(), authors: authors, genres: genres, user: user, });
    } catch(err){
      return next(err);
    }  
  };

  public static saveBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
      const book = new Book({
        title: req.body.title,
        genre: req.body.genre,
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
      const genre = await Genre.findById(newBook.genre);
      if (genre) {
        genre.books.push(newBook.id);
        await genre.save();
      }
      logger.info(`New book was successfully added to db: ${newBook}`);
      res.redirect("book");
    } catch(err){
      return next(err);
    }    
  };

  public static updateBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
      const book = await Book.findById(req.params.id);
      const currentAuthor = await Author.findById(book?.author);
      const currentGenre = await Genre.findById(book?.genre);
      console.log(book);
      if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre,
        book.publishDate = req.body.publishDate;
        book.pageCount = req.body.pageCount;
        book.description = req.body.description;
        if (req.files) {
          book.cover = Buffer.from((req.files as any).cover.data, "base64");
          book.coverType = (req.files as any).cover.mimetype;
        }
        const savedBook = await book.save();
        console.log(savedBook);
        const author = await Author.findById(savedBook.author);
        if (author && currentAuthor?.id != savedBook.author) {
          currentAuthor?.books.splice(currentAuthor.books.indexOf(book.author), 1)
          await currentAuthor?.save();
          author.books.push(savedBook.id);
          await author.save();
        }
        const genre = await Genre.findById(savedBook.genre);
        if (genre && currentGenre?.id != savedBook.genre) {
          currentGenre?.books.splice(currentGenre.books.indexOf(book.genre), 1);
          await currentGenre?.save();
          genre.books.push(savedBook.id);
          await genre.save();
        }
        logger.info(`Book was successfully updated to ${book}`);
        this.renderBook(req, res, next);
      }
    } catch(err){
      return next(err);
    } 
  } 

  public static editBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const authors = await Author.find({});
      const genres = await Genre.find({});
      const book = await Book.findById(req.params.id);
      res.render("book/edit", { book: book, authors: authors, genres: genres, user: user });
    } catch(err){
      return next(err);
    }
  };

  public static deleteBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
      const book = await Book.findById({ _id: id });
      if (book) {
        const author = await Author.findById(book.author);
        if (author) {
          author.books.splice(author.books.indexOf(book.author), 1);
          await author.save();
        }
        const genre = await Genre.findById(book.genre);
        if (genre) {
          genre.books.splice(genre.books.indexOf(book.genre), 1);
          await genre.save();
        }
        await Book.findOneAndDelete({ _id: id });
        logger.info(`Book was successfully deleted: ${book}`);
        this.renderBook(req, res, next);
      }
    } catch(err){
      return next(err);
    }
  };

  private static async renderBook(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    let searchOption: any = {};
    const pattern: any = req.query.title || "";
    if (pattern) {
      searchOption.title = new RegExp(pattern, "i");
    }
    try{
      const books = await Book.find(searchOption).populate("author").populate("genre").exec();
      res.render("book/index", { books: books, searchOption: req.query, user: user });
    } catch(err){
      return next(err);
    }
  };
}

export default BookController;
