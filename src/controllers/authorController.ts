import express ,{Router, Request, Response} from 'express';

class AuthorController {
    public static getAuthor = (req:Request, res:Response) => {
        res.send("the first author get response");
    }  
    public static saveAuthor = (req:Request, res:Response) => {
        res.send("the first author post response");
    }  
    public static updateAuthor = (req:Request, res:Response) => {
        res.send("the first author update response");
    }  
    public static deleteAuthor = (req:Request, res:Response) => {
        res.send("the first author delete response");
    }  
}

export default AuthorController;