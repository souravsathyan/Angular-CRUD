import { Request } from "express"

export interface Iuser {
    _id: string,
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

