import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ResetForm } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { GroupModel } from '../../models/group.model';
import { AddRoleCommand } from '../../models/commands/add-role.command';
import { EditRoleCommand } from '../../models/commands/edit-role.command';
import { AddEditRoleFormGroup } from '../../models/forms/add-edit-role-form-group';
import { Add, Edit } from '../../states/roles.action';

@Component({
  selector: 'app-add-edit-role-dialog',
  templateUrl: './add-edit-role-dialog.component.html',
  styleUrls: ['./add-edit-role-dialog.component.scss'],
})
export class AddEditRoleDialogComponent {
  roleForm: FormGroup<AddEditRoleFormGroup>;
  isAddMode: boolean;

  constructor(private fb: FormBuilder, private store: Store, @Inject(MAT_DIALOG_DATA) role: GroupModel) {
    this.isAddMode = !role;

    const idValidators: ValidatorFn[] = [];
    if (!this.isAddMode) {
      idValidators.push(Validators.required);
    }

    this.roleForm = fb.group<AddEditRoleFormGroup>({
      id: new FormControl<number | null>(this.isAddMode ? null : role.id, {
        validators: idValidators,
      }),
      name: new FormControl<string>(this.isAddMode ? '' : role.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.store.dispatch(
      new ResetForm({
        path: 'roles.addEditRoleForm',
        value: this.roleForm.value,
      })
    );
  }

  onSubmit() {
    if (!this.roleForm.valid) return;

    if (this.isAddMode) {
      this.store.dispatch(new Add(this.roleForm.value as AddRoleCommand));
    } else {
      this.store.dispatch(new Edit(this.roleForm.value.id!, this.roleForm.value as EditRoleCommand));
    }
  }
}
