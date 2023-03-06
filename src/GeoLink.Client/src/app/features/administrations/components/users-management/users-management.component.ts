import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UsersState } from '../../states/users.state';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { UserModel } from '../../models/user.model';
import { Load } from '../../states/users.action';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { filter, map, Observable } from 'rxjs';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../../../../shared/models/enum-description-region.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
})
export class UsersManagementComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<UserModel>('name'),
    nameof<UserModel>('role'),
    nameof<UserModel>('groups'),
    nameof<UserModel>('regions'),
    'actions',
  ];
  users$ = this.store.select(UsersState.getUsers);
  systemGroups$ = this.store.select(DictionaryState.getSystemGroups);
  systemRegions$ = this.store.select(DictionaryState.getSystemRegions);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  deleteUser(user: UserModel) {
    console.log('deleting user...', user);
  }

  getSystemGroupDescription(groupId: number): Observable<EnumDescriptionWithScopesModel> {
    return this.systemGroups$.pipe(map(x => x.filter(e => e.id === groupId)[0]));
  }

  getSystemRegionDescription(regionId: number): Observable<EnumDescriptionRegionModel> {
    return this.systemRegions$.pipe(map(x => x.filter(e => e.id === regionId)[0]));
  }
}
