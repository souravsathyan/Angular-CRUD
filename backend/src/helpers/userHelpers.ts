import { UserDB } from "../models/userModel";
import bcrypt from 'bcrypt'
import { Iuser } from "models/interface";

export default {
    userSignUp:(email:string,name:string,password:string)=>{
        return new Promise(async(resolve, reject) => {
            let user:Iuser = await UserDB.findOne({email:email})
            if(user){
                reject({status:400, message:'email alrady exists'})
            }else{
                password = await bcrypt.hash(password,10)
                 UserDB.create({
                    name:name,
                    email:email,
                    password:password,
                })
                .then((data)=>{
                    resolve({user:data})
                })
                .catch((err)=>{
                    reject({status:500, message:'something went wrong try agin after sometime'})
                })
                
            }
        })
    }
}