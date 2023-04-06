import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GroupsStateModel } from './groups.state.model';
import { EditPrivileges } from './groups.action';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { GroupsService } from '../services/groups.service';
import { GetSystemGroups } from '../../../shared/states/dictionary.action';
import { CloseEditPrivilegesDialogForGroup } from '../../../shared/states/modal.action';

const GROUPS_STATE_TOKEN = new StateToken<GroupsStateModel>('groups');

@State<GroupsStateModel>({
  name: GROUPS_STATE_TOKEN,
  defaults: {
    editPrivilegesForm: DefaultFormStateValue,
  },
})
@Injectable()
export class GroupsState {
  constructor(private groupsService: GroupsService, private toastrService: ToastrService) {}

  @Action(EditPrivileges)
  editPrivileges(ctx: StateContext<GroupsStateModel>, action: EditPrivileges) {
    return this.groupsService.editPrivileges(action.groupId, action.scopes).pipe(
      tap(_ => {
        this.toastrService.success('Uprawnienia dla grupy zostały edytowane');
        ctx.dispatch([new GetSystemGroups(), new CloseEditPrivilegesDialogForGroup()]);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
