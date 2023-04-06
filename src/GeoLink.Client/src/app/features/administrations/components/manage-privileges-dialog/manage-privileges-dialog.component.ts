import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AuthScopes } from '../../../../shared/auth/models/auth.scopes';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EditPrivileges as EditGroupPrivileges } from '../../states/groups.action';
import { EditPrivileges as EditRolePrivileges } from '../../states/roles.action';

@Component({
  selector: 'app-manage-privileges-dialog',
  templateUrl: './manage-privileges-dialog.component.html',
  styleUrls: ['./manage-privileges-dialog.component.scss'],
})
export class ManagePrivilegesDialogComponent {
  systemPermissions$ = this.store.select(DictionaryState.getSystemPermissions);
  selectedPermissions: AuthScopes[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { isGroup: boolean; isRole: boolean; model: EnumDescriptionWithScopesModel },
    private store: Store
  ) {
    this.selectedPermissions = [...dialogData.model.authScopes];
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
  }

  onSubmit() {
    if (this.dialogData.isGroup) {
      this.store.dispatch(new EditGroupPrivileges(this.dialogData.model.id, this.selectedPermissions));
    } else {
      this.store.dispatch(new EditRolePrivileges(this.dialogData.model.id, this.selectedPermissions));
    }
  }
}
