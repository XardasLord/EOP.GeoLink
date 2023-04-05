import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditPrivilegesFormGroup } from '../../models/forms/edit-privileges-form-group';
import { Store } from '@ngxs/store';
import { AuthScopes } from '../../../../shared/auth/models/auth.scopes';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';

@Component({
  selector: 'app-manage-privileges-dialog',
  templateUrl: './manage-privileges-dialog.component.html',
  styleUrls: ['./manage-privileges-dialog.component.scss'],
})
export class ManagePrivilegesDialogComponent {
  editPrivilegesForm!: FormGroup<EditPrivilegesFormGroup>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public model: EnumDescriptionWithScopesModel,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.editPrivilegesForm = fb.group<EditPrivilegesFormGroup>({
      scopes: new FormControl<AuthScopes[]>([], {
        nonNullable: true,
      }),
    });
  }

  onSubmit() {
    if (!this.editPrivilegesForm.valid) return;

    // this.store.dispatch(new EditPrivileges(this.editPrivilegesForm.value as AddNewGroupCommand));
  }
}
