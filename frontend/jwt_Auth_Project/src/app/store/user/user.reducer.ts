import { createReducer, on } from '@ngrx/store';
import { userState } from './user.model';
import {
  userLogin,
  userLoginSuccess,
  userRegistrationSuccess,
} from './user.action';

export const initialState: userState = {
  user: null,
  token: null,
};

const _userReducer = createReducer(
  initialState,
  //user login
  on(userLoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.userDetails,
    };
  }),
  //user registration
  on(userRegistrationSuccess, (state, action) => {
    return {
      ...state,
    };
  })
);
export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
