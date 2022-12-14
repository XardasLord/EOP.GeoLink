import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { RolesStateModel } from './roles.state.model';
import { RoleModel } from '../models/role.model';
import { IRolesService } from '../services/roles.service.base';
import { Load } from './roles.action';

const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: {
    roles: [],
  },
})
@Injectable()
export class RolesState {
  constructor(private rolesService: IRolesService) {}

  @Selector([ROLES_STATE_TOKEN])
  static getRoles(state: RolesStateModel): RoleModel[] {
    return state.roles;
  }

  @Action(Load)
  loadGroups(ctx: StateContext<RolesStateModel>, _: Load) {
    return this.rolesService.getAllRoles().pipe(
      tap(response => {
        ctx.patchState({
          roles: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
