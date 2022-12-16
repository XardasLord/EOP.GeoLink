import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ResetForm } from '@ngxs/form-plugin';
import { Edit } from '../../states/groups.action';
import { EditGroupFormGroup } from '../../models/forms/edit-group-form-group';
import { GroupModel } from '../../models/group.model';
import { EditGroupCommand } from '../../models/commands/edit-group.command';

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss'],
})
export class EditGroupDialogComponent {
  editGroupForm: FormGroup<EditGroupFormGroup>;

  constructor(private fb: FormBuilder, private store: Store, @Inject(MAT_DIALOG_DATA) group: GroupModel) {
    this.editGroupForm = fb.group<EditGroupFormGroup>({
      id: new FormControl<number>(group.id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      name: new FormControl<string>(group.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.store.dispatch(
      new ResetForm({
        path: 'groups.editGroupForm',
        value: this.editGroupForm.value,
      })
    );
  }

  onSubmit() {
    if (!this.editGroupForm.valid) return;

    this.store.dispatch(new Edit(this.editGroupForm.value.id!, this.editGroupForm.value as EditGroupCommand));
  }
}
