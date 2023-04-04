import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GroupsStateModel } from './groups.state.model';
import { GroupModel } from '../models/group.model';
import { Add, Edit, LoadPrivileges } from './groups.action';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { GroupsService } from '../services/groups.service';

const GROUPS_STATE_TOKEN = new StateToken<GroupsStateModel>('groups');

@State<GroupsStateModel>({
  name: GROUPS_STATE_TOKEN,
  defaults: {
    groups: [],
    editPrivilegesForm: DefaultFormStateValue,
  },
})
@Injectable()
export class GroupsState {
  constructor(private groupsService: GroupsService) {}

  @Selector([GROUPS_STATE_TOKEN])
  static getGroups(state: GroupsStateModel): GroupModel[] {
    return state.groups;
  }

  @Action(LoadPrivileges)
  loadPrivileges(ctx: StateContext<GroupsStateModel>, _: LoadPrivileges) {
    // return this.groupsService.getAllGroups().pipe(
    //   tap(response => {
    //     ctx.patchState({
    //       groups: response,
    //     });
    //   }),
    //   catchError(error => {
    //     return throwError(error);
    //   })
    // );
  }

  @Action(Add)
  addNewGroup(ctx: StateContext<GroupsStateModel>, action: Add) {
    return this.groupsService.addGroup(action.command).pipe(
      tap(groupId => {
        ctx.setState(
          patch({
            groups: append<GroupModel>([
              {
                id: groupId,
                name: action.command.name,
              },
            ]),
          })
        );

        // ctx.dispatch(new CloseAddNewGroupDialog());
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(Edit)
  editGroup(ctx: StateContext<GroupsStateModel>, action: Edit): Observable<void> {
    return this.groupsService.editGroup(action.groupId, action.command).pipe(
      tap(_ => {
        ctx.setState(
          patch({
            groups: updateItem<GroupModel>(
              x => x?.id === action.groupId,
              patch({
                name: action.command.name,
              })
            ),
          })
        );

        // ctx.dispatch(new CloseEditGroupDialog());
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
