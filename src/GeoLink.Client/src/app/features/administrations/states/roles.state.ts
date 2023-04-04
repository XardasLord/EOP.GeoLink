import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RolesStateModel } from './roles.state.model';
import { RoleModel } from '../models/role.model';
import { Add, Edit } from './roles.action';
import { CloseEditPrivilegesDialogForRole } from '../../../shared/states/modal.action';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { RolesService } from '../services/roles.service';

const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: {
    roles: [],
    addEditRoleForm: DefaultFormStateValue,
  },
})
@Injectable()
export class RolesState {
  constructor(private rolesService: RolesService) {}

  @Selector([ROLES_STATE_TOKEN])
  static getRoles(state: RolesStateModel): RoleModel[] {
    return state.roles;
  }

  @Action(Add)
  addNewGroup(ctx: StateContext<RolesStateModel>, action: Add) {
    return this.rolesService.addRole(action.command).pipe(
      tap(roleId => {
        ctx.setState(
          patch({
            roles: append<RoleModel>([
              {
                id: roleId,
                name: action.command.name,
              },
            ]),
          })
        );

        ctx.dispatch(new CloseEditPrivilegesDialogForRole());
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(Edit)
  editGroup(ctx: StateContext<RolesStateModel>, action: Edit): Observable<void> {
    return this.rolesService.editRole(action.roleId, action.command).pipe(
      tap(_ => {
        ctx.setState(
          patch({
            roles: updateItem<RoleModel>(
              x => x?.id === action.roleId,
              patch({
                name: action.command.name,
              })
            ),
          })
        );

        ctx.dispatch(new CloseEditPrivilegesDialogForRole());
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
