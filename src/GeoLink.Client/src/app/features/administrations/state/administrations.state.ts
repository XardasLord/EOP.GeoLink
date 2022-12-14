import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { AdministrationsStateModel } from './administrations.state.model';
import { UserModel } from '../models/user.model';
import { LoadUsers } from './administrations.action';
import { IUsersService } from '../services/users.service.base';

const ADMINISTRATIONS_STATE_TOKEN = new StateToken<AdministrationsStateModel>(
  'administrations'
);

@State<AdministrationsStateModel>({
  name: ADMINISTRATIONS_STATE_TOKEN,
  defaults: {
    users: [],
  },
})
@Injectable()
export class AdministrationsState {
  constructor(private usersService: IUsersService) {}

  @Selector([ADMINISTRATIONS_STATE_TOKEN])
  static getUsers(state: AdministrationsStateModel): UserModel[] {
    return state.users;
  }

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<AdministrationsStateModel>, _: LoadUsers) {
    return this.usersService.getAllUsers().pipe(
      tap(response => {
        ctx.patchState({
          users: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
