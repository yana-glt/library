import express, { Response, NextFunction } from "express";
import MagazineType from '../models/magazineType';
import Magazine from '../models/magazine';
import CustomRequest from '../middleware/customRequest';
import log4js from "../middleware/logger";
import CustomError from "../middleware/customError";

const logger = log4js.getLogger("file");

class MagazineTypeController{
    public static viewMagazineTypes = (req: CustomRequest, res: Response, next: NextFunction) => {
        this.renderMagazineType(req, res, next);
      };
    
      public static viewMagazineType = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        try{
          const magazineType = await MagazineType.findById(req.params.id);
          const magazinesIdList = magazineType?.magazines || [];
          const magazines = [];
          for(let i = 0; i < magazinesIdList?.length; i++){
            const magazine = await Magazine.findById(magazinesIdList[i]).populate("magazineType").exec();
            magazines.push(magazine);
          }
          res.render("type/view", { magazineType: magazineType, user: user, magazines: magazines });
        } catch(err){
          return next(err);
        } 
      };
    
      public static saveMagazineType = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const { name, description } = req.body;
        const magazineType = new MagazineType({ name, description });
        try{
          const newMagazineType = await magazineType.save();
          this.renderMagazineType(req, res, next);
          logger.info(`New magazine type was successfully added to db: ${newMagazineType}`);
        } catch(err){
          return next(err);
        } 
      };
    
      public static editMagazineType = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        try{
          const magazineType = await MagazineType.findById(req.params.id);
          res.render("type/edit", { magazineType: magazineType, user: user });
        } catch(err){
          return next(err);
        }     
      };
    
      public static newMagazineType = (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        res.render("type/new", { magazineType: new MagazineType(), user: user });
      };
    
      public static updateMagazineType = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        try{
          const magazineType: any = await MagazineType.findById(req.params.id);
          magazineType.name = req.body.name;
          magazineType.description = req.body.description;
          await magazineType.save();
          logger.info(`Magazine type was successfully updated to ${magazineType}`);
          this.renderMagazineType(req, res, next);
        } catch(err){
          return next(err);
        }
      };
    
      public static deleteMagazineType = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try{
          const magazineType = await MagazineType.findOne({ _id: id });
          if(magazineType && magazineType?.magazines.length > 0){
            throw new CustomError(406, 'There are other magazines of this type in the library, you cannot delete the type until you delete all magazines of this type')
          }
          const deletedMagazineType = await MagazineType.findOneAndDelete({ _id: id });
          logger.info(`Magazine type was successfully deleted: ${deletedMagazineType}`);
          this.renderMagazineType(req, res, next);
        } catch(err){
          return next(err);
        }
      };
    
      private static async renderMagazineType(req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user;
        let searchOption: any = {};
        const pattern: any = req.query.name || "";
        if (pattern) {
          searchOption.name = new RegExp(pattern, "i");
        }
        try{
          const magazineTypes = await MagazineType.find(searchOption);
          res.render("type/index", { magazineTypes: magazineTypes, searchOption: req.query, user: user });
        } catch(err){
          return next(err);
        }  
      };
}

export default MagazineTypeController;