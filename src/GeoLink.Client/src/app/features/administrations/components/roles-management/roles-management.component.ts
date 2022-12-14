import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { RoleModel } from '../../models/role.model';
import { Load } from '../../states/roles.action';
import { RolesState } from '../../states/roles.state';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss'],
})
export class RolesManagementComponent implements OnInit {
  displayedColumns: string[] = [nameof<RoleModel>('name'), 'actions'];

  roles$ = this.store.select(RolesState.getRoles);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  renameRole(role: RoleModel) {
    console.log('renaming role...', role);
  }
}
