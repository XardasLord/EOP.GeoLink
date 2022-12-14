import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AdministrationsState } from '../../state/administrations.state';
import { LoadUsers } from '../../state/administrations.action';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
})
export class UsersManagementComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<UserModel>('name'),
    nameof<UserModel>('role'),
    nameof<UserModel>('group'),
    'actions',
  ];
  users$ = this.store.select(AdministrationsState.getUsers);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }

  deleteUser(user: UserModel) {
    console.warn('deleting user...', user);
  }
}
