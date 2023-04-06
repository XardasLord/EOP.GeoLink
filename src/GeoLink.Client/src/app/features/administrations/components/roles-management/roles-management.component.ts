import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss'],
})
export class RolesManagementComponent {
  displayedColumns: string[] = [
    nameof<EnumDescriptionWithScopesModel>('name'),
    nameof<EnumDescriptionWithScopesModel>('description'),
    'actions',
  ];

  roles$ = this.store.select(DictionaryState.getSystemRoles);

  constructor(private store: Store) {}

  changePrivileges(role: any) {
    // this.store.dispatch(new OpenChangePrivilegesDialog(role));
  }
}
