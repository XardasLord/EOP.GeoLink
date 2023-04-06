import { Component, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthScopes } from '../../../../shared/auth/models/auth.scopes';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EditPrivileges } from '../../states/groups.action';

@Component({
  selector: 'app-manage-privileges-dialog',
  templateUrl: './manage-privileges-dialog.component.html',
  styleUrls: ['./manage-privileges-dialog.component.scss'],
})
export class ManagePrivilegesDialogComponent {
  systemPermissions$ = this.store.select(DictionaryState.getSystemPermissions);
  selectedPermissions: AuthScopes[];

  constructor(@Inject(MAT_DIALOG_DATA) public model: EnumDescriptionWithScopesModel, private store: Store) {
    this.selectedPermissions = [...model.authScopes];
  }

  isSelected(scope: AuthScopes): boolean {
    return this.selectedPermissions.includes(scope);
  }

  changeSelection(checked: boolean, scope: AuthScopes): void {
    if (this.isSelected(scope)) {
      this.selectedPermissions.splice(this.selectedPermissions.indexOf(scope), 1);
    } else {
      this.selectedPermissions.push(scope);
    }

    console.log(this.selectedPermissions);
  }

  onSubmit() {
    // TODO: Verify if it is a group or role and dispatch corresponding action
    this.store.dispatch(new EditPrivileges(this.model.id, this.selectedPermissions));
  }
}
