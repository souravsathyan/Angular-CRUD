import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { AuthServiceService } from "src/app/service/auth-service.service";
import { getUsers, getUsersListSuccess } from "./admin.action";
import { userInputData } from "../user/user.model";
import { userListModel } from "./admin.model";

@Injectable()
export class adminEffects{
    constructor(
        private actions$ : Actions,
        private service : AuthServiceService,
    ){}


    _listUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap((action) =>
        this.service.getAllusers().pipe(
          map((res: userListModel) => {
            console.log(res,'in the effects')
            return getUsersListSuccess({ userList: res })
          })
        )
      )
    )
  );
}