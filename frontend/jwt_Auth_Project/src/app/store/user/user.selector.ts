import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "./user.model";

const getUserState = createFeatureSelector <userModel> ('user');

export const getUserName = createSelector(getUserState, (state)=>{
    console.log(state)
    return state.user;
})