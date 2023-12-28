import express, { Response, NextFunction } from "express";
import MagazineType from '../models/magazineType';
import Magazine from '../models/magazine';
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class MagazineController {
  public static viewMagazines = (req: CustomRequest, res: Response, next: NextFunction) => {
    this.renderMagazine(req, res, next);
  };

  public static viewMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const magazine = await Magazine.findById(req.params.id).populate("magazineType").exec();
      res.render("magazine/view", { magazine: magazine, user: user });
    } catch(err){
      return next(err);
    }   
  };

  public static newMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const magazineTypes = await MagazineType.find();
      res.render("magazine/new", { magazine: new Magazine(), magazineTypes: magazineTypes, user: user, });
    } catch(err){
      return next(err);
    }  
  };

  public static saveMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
      const magazine = new Magazine({
        title: req.body.title,
        magazineType: req.body.magazineType,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
      });
      if (req.files) {
        magazine.cover = Buffer.from((req.files as any).cover.data, "base64");
        magazine.coverType = (req.files as any).cover.mimetype;
      }
      const newMagazine = await magazine.save();
      const magazineType = await MagazineType.findById(newMagazine.magazineType);
      if (magazineType) {
        magazineType.magazines.push(newMagazine.id);
        await magazineType.save();
      }
      logger.info(`New magazine was successfully added to db: ${newMagazine}`);
      res.redirect("magazine");
    } catch(err){
      return next(err);
    }    
  };

  public static updateMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
      const magazine = await Magazine.findById(req.params.id);
      const currentMagazineType = await MagazineType.findById(magazine?.magazineType);
      if (magazine) {
        magazine.title = req.body.title;
        magazine.magazineType = req.body.magazineType,
        magazine.publishDate = req.body.publishDate;
        magazine.pageCount = req.body.pageCount;
        if (req.files) {
          magazine.cover = Buffer.from((req.files as any).cover.data, "base64");
          magazine.coverType = (req.files as any).cover.mimetype;
        }
        const savedMagazine = await magazine.save();
        const magazineType = await MagazineType.findById(savedMagazine.magazineType);
        if (magazineType && currentMagazineType?.id != savedMagazine.magazineType) {
          currentMagazineType?.magazines.splice(currentMagazineType.magazines.indexOf(magazine.magazineType), 1);
          await currentMagazineType?.save();
          magazineType.magazines.push(savedMagazine.id);
          await magazineType.save();
        }
        logger.info(`Magazine was successfully updated to ${magazine}`);
        this.renderMagazine(req, res, next);
      }
    } catch(err){
      return next(err);
    } 
  } 

  public static editMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
      const magazineTypes = await MagazineType.find({});
      const magazine = await Magazine.findById(req.params.id);
      res.render("magazine/edit", { magazine: magazine, magazineTypes: magazineTypes, user: user });
    } catch(err){
      return next(err);
    }
  };

  public static deleteMagazine = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
      const magazine = await Magazine.findById({ _id: id });
      if (magazine) {
        const magazineType = await MagazineType.findById(magazine.magazineType);
        if (magazineType) {
          magazineType.magazines.splice(magazineType.magazines.indexOf(magazine.magazineType), 1);
          await magazineType.save();
        }
        await Magazine.findOneAndDelete({ _id: id });
        logger.info(`Magazine was successfully deleted: ${magazine}`);
        this.renderMagazine(req, res, next);
      }
    } catch(err){
      return next(err);
    }
  };

  private static async renderMagazine(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    const titlePattern: any = req.query.title || "";
    const typePattern: any = req.query.type || "";
    try{
      const magazines = await Magazine.find({"title": new RegExp(titlePattern, "i")})
      .populate({ path: 'magazineType', match: { name: new RegExp(typePattern, "i")}}).exec();
      const searchedMagazines = [];
      for(let i = 0; i < magazines?.length; i++){
        if(magazines[i].magazineType != null){
          searchedMagazines.push(magazines[i])
        }
      }
      res.render("magazine/index", { magazines: searchedMagazines, searchOption: req.query, user: user });
    } catch(err){
      return next(err);
    }
  };
}

export default MagazineController;