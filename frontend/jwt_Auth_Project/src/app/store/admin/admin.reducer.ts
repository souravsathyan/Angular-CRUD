import { createReducer, on } from "@ngrx/store"
import {  createUserSuccess, deleteUserSuccess, getUsersListSuccess } from "./admin.action"
import { UserListState } from "./admin.state"

const _adminReducer = createReducer(
    UserListState,
    on(getUsersListSuccess,(state, action)=>{
        return {
            ...state,
            user:action.userList
        }
    }),
    on(deleteUserSuccess,(state,action)=>{
        return{
            ...state,
            user:state.user.filter((user) => user._id !== action.id)
        }
    }),
    on(createUserSuccess,(state,action)=>{
        console.log(action,'in the action reducer admin')
        return {
            ...state,
            user:[...state.user, action.userDetails]
        }
    })
)



export function adminReducer (state : any, action : any){
    return _adminReducer(state,action)
}