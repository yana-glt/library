import express ,{Router, Request, Response} from 'express';

class IndexController {
    public static getIndex = (req:Request, res:Response) => {
        res.render('index');
    } 
}

export default IndexController;