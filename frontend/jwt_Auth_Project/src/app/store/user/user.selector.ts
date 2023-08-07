import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./user.model";

const getUserState = createFeatureSelector <userState> ('user');

export const getBlog = createSelector(getUserState, (state)=>{
    console.log(state),'fdhfjsdfsdfsdfsdfsd'
    return state.user?.name;
})