import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "./user.model";

const getUserState = createFeatureSelector <userModel> ('user');

export const getUserName = createSelector(getUserState, (state)=>{
    return state.user;
})

export const getUserImage = createSelector(getUserState, (state)=>{
    return state.user.image;
})