import express ,{Router, Request, Response} from 'express';
import Book from '../models/book';
import Author from '../models/author';

class BookController {
    public static viewBooks = (req:any, res:Response) => {
        this.renderBook(req, res);
    }  

    public static viewBook = async (req:any, res:Response) => {
        const user = req.user;
        const book:any = await Book.findById(req.params.id).populate('author').exec();
        res.render('book/view', {book:book, user:user});
    } 

    public static newBook = async (req:any, res:Response) => {
        const user = req.user;
        const authors:any = await Author.find();
        res.render('book/new', {book:new Book(), authors:authors, user:user});
    }  

    public static saveBook = async (req:Request, res:Response) => {
        console.log(req.body);
        console.log(req.files);
        const book = new Book({
            title: req.body.title, 
            author: req.body.author,
            publishDate: req.body.publishDate,
            pageCount: req.body.pageCount,
            description: req.body.description,
        });
        if(req.files){
            book.cover = Buffer.from((req.files as any).cover.data, 'base64');
            book.coverType = (req.files as any).cover.mimetype;
        }
        const newBook = await book.save();
        res.redirect('book');
        console.log(newBook);
    } 
    
    public static updateBook = async (req:any, res:Response) => {
        const book:any = await Book.findById(req.params.id);
        if(req.body){
            book.title = req.body.title;
            book.author = req.body.author;
            book.publishDate = req.body.publishDate;
            book.pageCount = req.body.pageCount;
            book.description = req.body.description;
            if(req.files){
                book.cover = Buffer.from((req.files as any).cover.data, 'base64');
                book.coverType = (req.files as any).cover.mimetype;
            }
        }
        await book.save();
        this.renderBook(req, res);
    } 

    public static editBook = async (req:any, res:Response) => {
        const user = req.user;
        const authors = await Author.find({});
        const book:any = await Book.findById(req.params.id);
        res.render('book/edit', {book:book, authors:authors, user:user});
    }

    public static deleteBook = async (req:Request, res:Response) => {
        const id = req.params.id;
        const book = await Book.findOneAndDelete({_id:id});
        this.renderBook(req, res);
    } 

    private static async renderBook(req:any, res:any){
        const user = req.user;
        let searchOption:any = {};
        const pattern:any = req.query.title || '';
        if(pattern){
            searchOption.title = new RegExp(pattern, 'i');
        }
        console.log(searchOption);
        const books:any = await Book.find(searchOption).populate('author').exec();
        console.log(books);
        res.render('book/index', {books:books, searchOption:req.query, user:user});
    }
}

export default BookController;