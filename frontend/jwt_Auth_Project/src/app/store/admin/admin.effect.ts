import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import {
  createUser,
  createUserSuccess,
  deleteUser,
  deleteUserSuccess,
  getUsers,
  getUsersListSuccess,
} from './admin.action';
import { userInputData } from '../user/user.model';
import { userListModel } from './admin.model';
import { Store } from '@ngrx/store';

@Injectable()
export class adminEffects {
  constructor(private store : Store,private actions$: Actions, private service: AuthServiceService) {}

  _listUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap((action) =>
        this.service.getAllusers().pipe(
          map((res: userInputData[]) => {
            return getUsersListSuccess({ userList: res });
          })
        )
      )
    )
  );

  _deleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) => {
        return this.service.deleteUser(action.id).pipe(
          map((res) => {
            return deleteUserSuccess({ id: action.id });
          })
        );
      })
    )
  );

  _createUser = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap((action) =>
        this.service.createUser(action).pipe(
          map((res) => {
            return createUserSuccess({userDetails:action.userDetails});
          })
        )
      )
    )
  );
}
