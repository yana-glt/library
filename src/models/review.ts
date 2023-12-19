import mongoose, { Document, Schema } from "mongoose";

export interface IReview {
  nickname: string,
  email: string,
  book: mongoose.Schema.Types.ObjectId,
  message: string,
};
export interface IReviewModel extends IReview, Document {};

const reviewSchema: Schema = new Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    book: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book"},
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IReviewModel>("Review", reviewSchema);