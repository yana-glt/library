import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
  title: string,
  description: string,
  genre: mongoose.Schema.Types.ObjectId,
  publishDate: Date,
  pageCount: number,
  cover: Buffer,
  coverType: string,
  author: mongoose.Schema.Types.ObjectId,
  reviews: mongoose.Schema.Types.ObjectId[],
};
export interface IBookModel extends IBook, Document {};

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type:mongoose.Schema.Types.ObjectId, required: true, ref: "Genre"},
    publishDate: { type: Date, required: true },
    pageCount: { type: Number, required: true },
    cover: { type: Buffer, required: true },
    coverType: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Author"},
    reviews:[{type: mongoose.Schema.Types.ObjectId,  ref:'Review'}],
  },
  { timestamps: true }
);


bookSchema.virtual('coverImagePath').get(function() {
    if(this.cover && this.coverType){
        return `data:${this.coverType};charset=utf-8;base64, ${this.cover.toString('base64')}`
    }
})

export default mongoose.model<IBookModel>("Book", bookSchema);
