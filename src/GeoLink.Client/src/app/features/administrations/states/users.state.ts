import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UsersStateModel } from './users.state.model';
import { UserModel } from '../models/user.model';
import { Load } from './users.action';
import { UsersService } from '../services/users.service';

const USERS_STATE_TOKEN = new StateToken<UsersStateModel>('users');

@State<UsersStateModel>({
  name: USERS_STATE_TOKEN,
  defaults: {
    users: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector([USERS_STATE_TOKEN])
  static getUsers(state: UsersStateModel): UserModel[] {
    return state.users;
  }

  @Action(Load)
  loadUsers(ctx: StateContext<UsersStateModel>, _: Load) {
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
