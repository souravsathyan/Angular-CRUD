import { createAction, props } from '@ngrx/store';
import {  userInputData } from './user.model';

export const LOGIN_USER = '[user] user login';
export const LOGIN_USER_SUCCESSS = '[user] user login success';
export const REG_USER = '[user] user registration';
export const REG_USER_SUCCESS = '[user] user registration success';
// export const LOAD_PROFILE = '[user] load user profile ';
// export const LOAD_PROFILE_SUCCESS = '[user] load user profile success';
// ----------------------------------------------------------------------
export const UPLOAD_PICTURE = '[user] upload picture';
export const UPLOAD_PICTURE_SUCESS = '[user] upload [picture success';
export const EDIT_USER = '[user] edit user';
export const EDIT_USER_SUCCESS = '[user] edit user success';
export const LOGOUT = '[user] user logout';

// user register
    export const userRegistration = createAction(
        REG_USER,
        props <{ userDetails : userInputData }>()
    )

    export const userRegistrationSuccess = createAction(
        REG_USER_SUCCESS
    )
// user login
    export const userLogin = createAction(
    LOGIN_USER,
    props<{ userDetails: userInputData }>()
    );

    export const userLoginSuccess = createAction(
    LOGIN_USER_SUCCESSS,
    props<{ userDetails: userInputData, token:string}>()
    );

// upload picture
    export const uploadPicture = createAction(
        UPLOAD_PICTURE,
        props <{userImage: FormData}> ()
    )

    export const uploadPictureSuccess = createAction(
        UPLOAD_PICTURE_SUCESS,
        props <{uploadedImage:string}>()
    )

