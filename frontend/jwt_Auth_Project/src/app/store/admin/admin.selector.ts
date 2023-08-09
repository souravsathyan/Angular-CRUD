import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "../user/user.model";

const userState = createFeatureSelector <userModel> ('admin')

export const getUserList = createSelector(userState,(state)=>{
    return state.user
})

export const usersAfterDeletion = createSelector(userState,(state)=>{
    return state.user
})

export const createdUser = createSelector(userState,(state)=>{
    return state.user
})

