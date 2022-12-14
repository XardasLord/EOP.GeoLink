import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UsersState } from '../../states/users.state';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { UserModel } from '../../models/user.model';
import { Load } from '../../states/users.action';

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
  users$ = this.store.select(UsersState.getUsers);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  deleteUser(user: UserModel) {
    console.log('deleting user...', user);
  }
}
