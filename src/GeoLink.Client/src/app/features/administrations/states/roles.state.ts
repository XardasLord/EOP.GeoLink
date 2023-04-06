import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { RolesStateModel } from './roles.state.model';
import { RolesService } from '../services/roles.service';
import { EditPrivileges } from './roles.action';
import { GetSystemRoles } from '../../../shared/states/dictionary.action';
import { CloseEditPrivilegesDialogForRole } from '../../../shared/states/modal.action';

const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class RolesState {
  constructor(private rolesService: RolesService, private toastrService: ToastrService) {}

  @Action(EditPrivileges)
  editPrivileges(ctx: StateContext<RolesStateModel>, action: EditPrivileges) {
    return this.rolesService.editPrivileges(action.roleId, action.scopes).pipe(
      tap(_ => {
        this.toastrService.success('Uprawnienia dla roli zostały edytowane');
        ctx.dispatch([new GetSystemRoles(), new CloseEditPrivilegesDialogForRole()]);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
