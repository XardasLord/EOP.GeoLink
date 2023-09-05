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
  GetDeviceGroupsRelation,
  GetMapDeviceTypes,
  GetMapObjectStatusTypes,
  GetMapObjectTypes,
  GetSystemGroups,
  GetSystemPermissions,
  GetSystemRegions,
  GetSystemRoles,
  GetTimeExtentDefinitions,
} from './dictionary.action';
import { LoadMapFilters, SetInitialMapFilters } from '../../features/maps/states/maps.action';

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
      actions.push(new GetDeviceGroupsRelation());
      actions.push(new GetTimeExtentDefinitions());
      actions.push(new GetConfigDefinitions());
      actions.push(
        new SetInitialMapFilters(
          user.init_objecttypefilters,
          user.init_devicefilters,
          user.init_regionfilters,
          user.init_statusfilters
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

    ctx.dispatch(new Navigate([RoutePaths.Map]));

    const state = ctx.getState();

    if (state.user) {
      ctx.dispatch([
        new GetMapObjectTypes(),
        new GetMapDeviceTypes(),
        new GetMapObjectStatusTypes(),
        new GetDeviceGroupsRelation(),
        new GetTimeExtentDefinitions(),
        new GetConfigDefinitions(),
        new SetInitialMapFilters(
          state.user.init_objecttypefilters,
          state.user.init_devicefilters,
          state.user.init_regionfilters,
          state.user.init_statusfilters
        ),
      ]);

      if (state.user?.role === AuthRoles.Geolink_Admin) {
        ctx.dispatch([new GetSystemGroups(), new GetSystemRoles(), new GetSystemRegions(), new GetSystemPermissions()]);
      }
    }
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
