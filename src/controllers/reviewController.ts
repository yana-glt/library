import express, { Response, NextFunction } from "express";
import Review from "../models/review";
import Book from "../models/book";
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class ReviewController {
  public static viewReviews = (req: CustomRequest, res: Response, next: NextFunction) => {
    this.renderReview(req, res, next);
  };

  public static newReview = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const book = await Book.findById(req.params.id);
      res.render("review/new", { review: new Review(), book: book, user: user, });
    } catch(err){
      return next(err);
    }  
  };

  public static saveReview = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const review = new Review({
        nickname: req.body.nickname,
        email: user?.email,
        book: req.params.id,
        message: req.body.message,
      });
      const newReview = await review.save();
      const book = await Book.findById(req.params.id);
      if (book) {
        book.reviews.push(newReview.id);
        await book.save();
      }
      logger.info(`New review was successfully added to db: ${newReview}`);
      res.redirect("/");
    } catch(err){
      return next(err);
    }    
  };

  private static async renderReview(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    try{
      const book = await Book.findById(req.params.id).populate("author").exec();
      const reviews = [];
      if(book){
        let reviewsIdList = book.reviews;
        for(let i = 0; i < reviewsIdList?.length; i++){
          const review = await Review.findById(reviewsIdList[i]);
          reviews.push(review);
        }
      }
      res.render("review/index", { reviews: reviews, book: book, user: user });
    } catch(err){
      return next(err);
    }
  };
}

export default ReviewController;
