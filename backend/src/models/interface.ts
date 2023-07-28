import { Request } from "express"
import { ObjectId } from "mongoose"

export interface Iuser {
    _id: string | ObjectId
    name: string,
    email: string,
    password?: string,
    image?: string
}

export interface headerRequest extends Request{
    headers:{
        authorization:string
    }
    user:any,
    token:any
}

export interface filesReq extends Request{
    files: any
}
