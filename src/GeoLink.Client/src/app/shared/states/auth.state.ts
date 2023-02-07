import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { tap } from 'rxjs';
import { UserAuthModel } from '../auth/models/user-auth.model';
import { AuthScopes } from '../auth/models/auth.scopes';
import { Login, LoginCompleted, Logout } from './auth.action';
import { RoutePaths } from '../../core/modules/app-routing.module';
import { AuthService } from '../services/auth.service';
import { AuthStateModel } from './auth.state.model';

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {
  constructor(private authService: AuthService) {}

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    // TODO: Pre login implementation in the background
    const user = AuthState.getUser(ctx.getState());

    if (!user) {
      ctx.dispatch(new Navigate([RoutePaths.Login]));
    }
  }

  @Selector([AUTH_STATE_TOKEN])
  static getUser(state: AuthStateModel): UserAuthModel | null {
    // TODO: It's a temporary solution. Once the login with backend is done this simulation will no longer be needed.
    if (state?.user === null && localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user')!);
    }

    return state?.user;
  }

  @Selector([AUTH_STATE_TOKEN])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.user?.accessToken;
  }

  @Selector([AUTH_STATE_TOKEN])
  static getUserScopes(state: AuthStateModel): AuthScopes[] {
    if (!state || !state.user || !state.user.scopes) {
      return [];
    }

    return Object.values(state.user.scopes).map(x => +x as number);
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService
      .login(action.login, action.password)
      .pipe(tap((response: UserAuthModel) => ctx.dispatch(new LoginCompleted(response))));
  }

  @Action(LoginCompleted)
  loginCompleted(ctx: StateContext<AuthStateModel>, action: LoginCompleted): void {
    ctx.patchState({
      user: action.response,
    });

    ctx.dispatch(new Navigate(['/']));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, _: Logout) {
    return this.authService.logout().pipe(tap(() => ctx.dispatch(new Navigate([RoutePaths.Login]))));
  }
}
