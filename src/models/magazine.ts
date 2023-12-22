import mongoose, { Document, Schema } from "mongoose";

export interface IMagazine {
  title: string,
  magazineType: mongoose.Schema.Types.ObjectId,
  publishDate: Date,
  pageCount: number,
  cover: Buffer,
  coverType: string,
};
export interface IMagazineModel extends IMagazine, Document {};

const magazineSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    magazineType: { type:mongoose.Schema.Types.ObjectId, required: true, ref: "MagazineType"},
    publishDate: { type: Date, required: true },
    pageCount: { type: Number, required: true },
    cover: { type: Buffer, required: true },
    coverType: { type: String, required: true },
  },
  { timestamps: true }
);


magazineSchema.virtual('coverImagePath').get(function() {
    if(this.cover && this.coverType){
        return `data:${this.coverType};charset=utf-8;base64, ${this.cover.toString('base64')}`
    }
})

export default mongoose.model<IMagazineModel>("Magazine", magazineSchema);
