import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "./user.model";

const getUserState = createFeatureSelector <userModel> ('user');

export const getBlog = createSelector(getUserState, (state)=>{
    return state.user?.name;
})