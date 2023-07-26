import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},
    phone:{type:Number}
})

export const UserDB = mongoose.model('User',UserSchema)


// export interface userModel {
//   _id?: string;
//   name: string;
//   phone: number;
//   email: string;
//   password?: string;
//   newPassword?: string;
//   image?: string;
// }