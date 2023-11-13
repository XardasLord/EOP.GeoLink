import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { concatMap, map, of, tap } from 'rxjs';
import { UserAuthModel } from '../auth/models/user-auth.model';
import { AuthScopes } from '../auth/models/auth.scopes';
import { Login, LoginCompleted, Logout } from './auth.action';
import { RoutePaths } from '../../core/modules/app-routing.module';
import { AuthService } from '../services/auth.service';
import { AuthStateModel } from './auth.state.model';
import { User } from 'oidc-client';
import { UserAuthHelper } from '../auth/helpers/user-auth.helper';
import { AuthRoles } from '../auth/models/auth.roles';
import {
  GetConfigDefinitions,
  GetDeviceAttributeSourceTypes,
  GetDeviceGroupsRelation,
  GetFilterAttributeDefinitions,
  GetMapDeviceTypes,
  GetMapObjectStatusTypes,
  GetMapObjectTypes,
  GetStatusesConfig,
  GetSystemGroups,
  GetSystemPermissions,
  GetSystemRegions,
  GetSystemRoles,
  GetTimeExtentDefinitions,
} from './dictionary.action';
import { LoadMapFilters, SetInitialMapFilters } from './filter.action';

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
    const user = AuthState.getUser(ctx.getState());

    if (!user) {
      ctx.dispatch(new Navigate([RoutePaths.Login]));
    }

    ctx.patchState({
      user: user,
    });

    const actions: any[] = [];

    if (user?.role === AuthRoles.Geolink_Admin) {
      actions.push(new GetSystemGroups());
      actions.push(new GetSystemRoles());
      actions.push(new GetSystemRegions());
      actions.push(new GetSystemPermissions());
    }

    if (user) {
      actions.push(new LoadMapFilters());
      actions.push(new GetMapObjectTypes());
      actions.push(new GetMapDeviceTypes());
      actions.push(new GetMapObjectStatusTypes());
      actions.push(new GetDeviceAttributeSourceTypes());
      actions.push(new GetDeviceGroupsRelation());
      actions.push(new GetTimeExtentDefinitions());
      actions.push(new GetConfigDefinitions());
      actions.push(new GetFilterAttributeDefinitions());
      actions.push(new GetStatusesConfig());
      actions.push(
        new SetInitialMapFilters(
          [user.init_objectfilterids],
          user.init_devicefilterids,
          user.init_regionfilterids,
          user.init_statusfilterids
        )
      );
    }

    of(actions)
      .pipe(
        concatMap(actionsArray => actionsArray),
        concatMap(action => ctx.dispatch(action))
      )
      .subscribe();
  }

  @Selector([AUTH_STATE_TOKEN])
  static getUser(state: AuthStateModel): UserAuthModel | null {
    if (state?.user === null && localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user')!);
    }

    return state?.user;
  }

  @Selector([AUTH_STATE_TOKEN])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.user;
  }

  @Selector([AUTH_STATE_TOKEN])
  static getUserScopes(state: AuthStateModel): AuthScopes[] {
    if (!state || !state.user || !state.user.auth_scopes) {
      return [];
    }

    return Object.values(state.user.auth_scopes).map(x => +x as number);
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.login, action.password).pipe(
      map((user: User) => {
        const authUser = UserAuthHelper.parseUserAuthData(user);

        if (authUser) {
          localStorage.setItem('access_token', user.access_token);
          localStorage.setItem('user', JSON.stringify(authUser));

          // const expiresAt = moment().add(authResult.expiresIn,'second');
          // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

          ctx.dispatch(new LoginCompleted(authUser));
        }
      })
    );
  }

  @Action(LoginCompleted)
  loginCompleted(ctx: StateContext<AuthStateModel>, action: LoginCompleted): void {
    ctx.patchState({
      user: action.response,
    });

    const state = ctx.getState();

    ctx.dispatch(new Navigate([RoutePaths.Map]));

    const actions: any[] = [];

    if (state.user?.role === AuthRoles.Geolink_Admin) {
      actions.push(new GetSystemGroups());
      actions.push(new GetSystemRoles());
      actions.push(new GetSystemRegions());
      actions.push(new GetSystemPermissions());
    }

    if (state.user) {
      actions.push(new LoadMapFilters());
      actions.push(new GetMapObjectTypes());
      actions.push(new GetMapDeviceTypes());
      actions.push(new GetMapObjectStatusTypes());
      actions.push(new GetDeviceAttributeSourceTypes());
      actions.push(new GetDeviceGroupsRelation());
      actions.push(new GetTimeExtentDefinitions());
      actions.push(new GetConfigDefinitions());
      actions.push(new GetFilterAttributeDefinitions());
      actions.push(new GetStatusesConfig());
      actions.push(
        new SetInitialMapFilters(
          [state.user.init_objectfilterids],
          state.user.init_devicefilterids,
          state.user.init_regionfilterids,
          state.user.init_statusfilterids
        )
      );
    }

    of(actions)
      .pipe(
        concatMap(actionsArray => actionsArray),
        concatMap(action => ctx.dispatch(action))
      )
      .subscribe();
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, _: Logout) {
    return this.authService.logout().pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // localStorage.removeItem("expires_at");

        ctx.patchState({
          user: null,
        });

        ctx.dispatch(new Navigate([RoutePaths.Login]));
      })
    );
  }
}
