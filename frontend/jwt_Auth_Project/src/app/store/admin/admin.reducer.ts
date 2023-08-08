import { createReducer, on } from "@ngrx/store"
import {  getUsersListSuccess } from "./admin.action"
import { UserListState } from "./admin.state"

const _adminReducer = createReducer(
    UserListState,
    on(getUsersListSuccess,(state, action)=>{
        return {
            ...state,
            user:action.userList
        }
    })
)



export function adminReducer (state : any, action : any){
    return _adminReducer(state,action)
}