import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESSS,
  REG_USER,
  userLoginSuccess,
  userRegistrationSuccess,
} from './user.action';
import { exhaustMap, switchMap, map, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { userModel } from './user.model';
import { UserState } from './user.state';

@Injectable()
export class userEffects {
  constructor(
    private action$: Actions,
    private service: AuthServiceService,
    private router: Router
  ) {}

  // user login with eamil and password
  _userLogin = createEffect(() =>
    this.action$.pipe(
      ofType(LOGIN_USER),
      switchMap((action) =>
        this.service.onLogin(action).pipe(
          map((res: userModel) => {
            // storing the userdata and token in the local storage 
            localStorage.setItem('token', res.token);
            localStorage.setItem('admin', 'false');
            localStorage.setItem('userDetails', JSON.stringify(res.user))
            return userLoginSuccess({
              userDetails: res.user,
              token: res.token,
            });
          })
        )
      )
    )
  );
  // after login redirecting to the home
  _loginSuccess = createEffect(
    () =>
      this.action$.pipe(
        ofType(userLoginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  //   user registration
  _userRegistration = createEffect(() =>
    this.action$.pipe(
      ofType(REG_USER),
      switchMap((action) =>
        this.service.createUser(action).pipe(
          map((res) => {
            return userRegistrationSuccess();
          })
        )
      )
    )
  );
  //   after registration redirecting to login
  _registerSuccess = createEffect(
    () =>
      this.action$.pipe(
        ofType(userRegistrationSuccess),
        tap(() => {
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );
}
