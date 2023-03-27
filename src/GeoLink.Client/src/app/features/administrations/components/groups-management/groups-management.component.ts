import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { GroupModel } from '../../models/group.model';
import { Load } from '../../states/groups.action';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.scss'],
})
export class GroupsManagementComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<EnumDescriptionWithScopesModel>('name'),
    nameof<EnumDescriptionWithScopesModel>('description'),
    'actions',
  ];

  groups$ = this.store.select(DictionaryState.getSystemGroups);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  changePrivileges(group: GroupModel) {}
}
