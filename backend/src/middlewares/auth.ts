import { NextFunction, Request, Response } from "express";
import { headerRequest } from "models/interface";
// import * as jwt from "jsonwebtoken";
import { Iuser } from "models/interface";
import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = "secret key";
import multer from "multer";
import * as path from 'path'


//token generation
export const generateToken = (user:any)=>{
  const payload = {
    id:user._id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
  const token = jwt.sign(payload, secretKey);
  return token
}

//token authorisation
export const tokenAuth = (
  req: headerRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  
  if(!authHeader){
    return res.json("no headers found")
  }
  const token = authHeader.substring(7, authHeader.length);

  if (!token) {
    return res.json("token not found")
  } 

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      res.json("invalid token")
    }
};

//multer file upload
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/assets/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
  })
})


