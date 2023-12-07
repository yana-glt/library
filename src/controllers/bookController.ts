import express ,{Router, Request, Response} from 'express';

class BookController {
    public static getBook = (req:Request, res:Response) => {
        res.send("the first book get response");
    }  

}

export default BookController;