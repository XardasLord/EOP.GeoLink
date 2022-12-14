import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { IGroupsService } from '../services/groups.service.base';
import { GroupsStateModel } from './groups.state.model';
import { GroupModel } from '../models/group.model';
import { Load } from './groups.action';

const GROUPS_STATE_TOKEN = new StateToken<GroupsStateModel>('groups');

@State<GroupsStateModel>({
  name: GROUPS_STATE_TOKEN,
  defaults: {
    groups: [],
  },
})
@Injectable()
export class GroupsState {
  constructor(private groupsService: IGroupsService) {}

  @Selector([GROUPS_STATE_TOKEN])
  static getGroups(state: GroupsStateModel): GroupModel[] {
    return state.groups;
  }

  @Action(Load)
  loadGroups(ctx: StateContext<GroupsStateModel>, _: Load) {
    return this.groupsService.getAllGroups().pipe(
      tap(response => {
        ctx.patchState({
          groups: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
