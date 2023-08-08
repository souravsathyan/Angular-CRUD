import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "../user/user.model";

const userState = createFeatureSelector <userModel> ('admin')

export const getUserList = createSelector(userState,(state)=>{
    console.log(state)
    return state.user
})

