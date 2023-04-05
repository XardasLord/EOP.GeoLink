import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { GroupsStateModel } from './groups.state.model';
import { LoadPrivileges } from './groups.action';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { GroupsService } from '../services/groups.service';

const GROUPS_STATE_TOKEN = new StateToken<GroupsStateModel>('groups');

@State<GroupsStateModel>({
  name: GROUPS_STATE_TOKEN,
  defaults: {
    editPrivilegesForm: DefaultFormStateValue,
  },
})
@Injectable()
export class GroupsState {
  constructor(private groupsService: GroupsService) {}

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
}
