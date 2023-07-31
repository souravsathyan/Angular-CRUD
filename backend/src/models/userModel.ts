import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},
    isBlocked:{type:Boolean,default:false}
})



export const UserDB = mongoose.model('User',UserSchema)

