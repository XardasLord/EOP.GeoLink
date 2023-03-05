import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { catchError, map, tap, throwError } from 'rxjs';
import { UserAuthModel } from '../auth/models/user-auth.model';
import { AuthScopes } from '../auth/models/auth.scopes';
import { Login, LoginCompleted, Logout } from './auth.action';
import { RoutePaths } from '../../core/modules/app-routing.module';
import { AuthService } from '../services/auth.service';
import { AuthStateModel } from './auth.state.model';
import { User } from 'oidc-client';
import { UserAuthHelper } from '../auth/helpers/user-auth.helper';
import { AuthRoles } from '../auth/models/auth.roles';
import { DictionaryStateModel } from './dictionary.state.model';
import { EnumDescriptionModel } from '../models/enum-description.model';
import { DictionaryService } from '../services/dictionary.service';
import { GetSystemGroups, GetSystemPermissions, GetSystemRegions, GetSystemRoles } from './dictionary.action';

export const DICTIONARY_STATE_TOKEN = new StateToken<DictionaryStateModel>('dictionary');

@State<DictionaryStateModel>({
  name: DICTIONARY_STATE_TOKEN,
  defaults: {
    systemGroups: [],
    systemRoles: [],
    systemRegions: [],
    systemPermissions: [],
  },
})
@Injectable()
export class DictionaryState {
  constructor(private dictionaryService: DictionaryService) {}

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemGroups(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.systemGroups;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemRoles(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.systemRoles;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemRegions(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.systemRegions;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemPermissions(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.systemPermissions;
  }

  @Action(GetSystemGroups)
  getSystemGroups(ctx: StateContext<DictionaryStateModel>, _: GetSystemGroups) {
    return this.dictionaryService.getSystemGroups().pipe(
      tap(response => {
        ctx.patchState({
          systemGroups: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemRoles)
  getSystemRoles(ctx: StateContext<DictionaryStateModel>, _: GetSystemRoles) {
    return this.dictionaryService.getSystemRoles().pipe(
      tap(response => {
        ctx.patchState({
          systemRoles: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemRegions)
  getSystemRegions(ctx: StateContext<DictionaryStateModel>, _: GetSystemRegions) {
    return this.dictionaryService.getSystemRegions().pipe(
      tap(response => {
        ctx.patchState({
          systemRegions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemPermissions)
  getSystemPermissions(ctx: StateContext<DictionaryStateModel>, _: GetSystemPermissions) {
    return this.dictionaryService.getSystemPermission().pipe(
      tap(response => {
        ctx.patchState({
          systemPermissions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
