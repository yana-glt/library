import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor {
  name: string,
  country: string,
};
export interface IAuthorModel extends IAuthor, Document {};

const authorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAuthorModel>("Author", authorSchema);
