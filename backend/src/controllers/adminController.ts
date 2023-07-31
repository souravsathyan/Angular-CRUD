import { UserDB } from "../models/userModel";
import { Request, Response } from "express";

export default {
  getAllUsers: async (req: Request, res: Response) => {
    UserDB.find().then((result) => {
      res.json(result);
    });
  },

  deleteUser : async (req:Request, res:Response)=>{
    try {
      const user = await UserDB.findByIdAndDelete(req.body.id)
      if(!user){
        return res.status(404).json({error:true})
      }
      return res.json({success:true})
    } catch (error) {
      return res.status(500).json({error:true})
    }
  }
};
