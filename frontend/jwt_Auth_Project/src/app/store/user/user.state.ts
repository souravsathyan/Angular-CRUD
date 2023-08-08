import { userModel } from "./user.model";

export const UserState : userModel = {
    user : {
        name:'',
        email:'',
        password:'',
        _id:'',
        isBlocked:false,
        image:''
    },
    token: '',
}