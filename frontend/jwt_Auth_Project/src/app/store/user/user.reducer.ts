import { createReducer, on } from '@ngrx/store';
import { userModel } from './user.model';
import { UserState } from './user.state';
import {
  userLogin,
  userLoginSuccess,
  userRegistrationSuccess,
} from './user.action';

const _userReducer = createReducer(
  UserState,
  //user login
  on(userLoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.userDetails,
      token:action.token
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
