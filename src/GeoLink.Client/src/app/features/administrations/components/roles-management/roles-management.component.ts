import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { RoleModel } from '../../models/role.model';
import { Load } from '../../states/roles.action';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss'],
})
export class RolesManagementComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<EnumDescriptionWithScopesModel>('name'),
    nameof<EnumDescriptionWithScopesModel>('description'),
    'actions',
  ];

  roles$ = this.store.select(DictionaryState.getSystemRoles);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  changePrivileges(role: RoleModel) {
    // this.store.dispatch(new OpenChangePrivilegesDialog(role));
  }
}
