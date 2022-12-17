import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { OpenAddEditRoleDialog, OpenAddNewGroupDialog } from '../../../../shared/states/modal.action';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
  constructor(private store: Store) {}

  addNewGroup() {
    this.store.dispatch(new OpenAddNewGroupDialog());
  }

  addNewRole() {
    this.store.dispatch(new OpenAddEditRoleDialog());
  }
}
