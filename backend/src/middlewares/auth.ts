import { NextFunction, Request, Response } from "express";
import { headerRequest } from 'models/interface';
import * as jwt from 'jsonwebtoken';


//token authorisation
export const tokenAuth = ((req:headerRequest, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      req.token = token;
      console.log(token)
      const decoded = jwt.verify(token,'secret key')
      req.user = decoded
      next();
    }else{
        return res.json('header error')
    }
  });