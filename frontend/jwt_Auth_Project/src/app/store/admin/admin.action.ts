import { createAction, props } from "@ngrx/store"
import { userInputData } from "../user/user.model"
import { userListModel } from "./admin.model"

export const ADMIN_GET_USERS = '[admin] get al the users'
export const ADMIN_GET_USERS_SUCCESS = '[admin] get users succes'
export const ADMIN_DELETE_USER = '[admin] delete user'
export const ADMIN_DELETE_USER_SUCCESS = '[admin] delete user success'
//---------------------------------------------------------------------
export const ADMIN_CREATE_USER = '[admin] create user'
export const ADMIN_CREATE_USER_SUCCESS = '[admin] create user success'

// getting the user list
export const getUsers = createAction(ADMIN_GET_USERS)
export const getUsersListSuccess = createAction(ADMIN_GET_USERS_SUCCESS,props<{userList : userInputData[]}>())

// deleting the user
export const deleteUser = createAction(ADMIN_DELETE_USER, props <{id:string}>())
export const deleteUserSuccess = createAction(ADMIN_DELETE_USER_SUCCESS, props <{id:string}>())

