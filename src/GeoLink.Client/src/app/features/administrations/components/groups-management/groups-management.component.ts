import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { GroupModel } from '../../models/group.model';
import { GroupsState } from '../../states/groups.state';
import { Load } from '../../states/groups.action';
import { OpenEditGroupDialog } from '../../../../shared/states/modal.action';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.scss'],
})
export class GroupsManagementComponent implements OnInit {
  displayedColumns: string[] = [nameof<GroupModel>('name'), 'actions'];

  groups$ = this.store.select(GroupsState.getGroups);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  renameGroup(group: GroupModel) {
    this.store.dispatch(new OpenEditGroupDialog(group));
  }
}
