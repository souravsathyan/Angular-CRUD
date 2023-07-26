import { UserDB } from "../models/userModel";
import bcrypt from 'bcrypt'
import { Iuser } from "models/interface";

export default {
    userSignUp:(userDetails:Iuser)=>{
        return new Promise(async(resolve, reject) => {
            let user:Iuser = await UserDB.findOne({email:userDetails.email})
            if(user){
                // console.log('existing email')
                reject({status:400, message:'email alrady exists'})
            }else{
                userDetails.password = await bcrypt.hash(userDetails.password,10)
                 UserDB.create({
                    username:userDetails.name,
                    email:userDetails.email,
                    password:userDetails.password,
                    image:userDetails.image
                })
                .then((data)=>{
                    resolve({data:data,message:'user created successfully!..'})
                })
                .catch((err)=>{
                    reject({status:500, message:'something went wrong try agin after sometime'})
                })
                
            }
        })
    }
}