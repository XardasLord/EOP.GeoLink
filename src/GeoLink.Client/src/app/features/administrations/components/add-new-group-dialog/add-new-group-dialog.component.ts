import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddNewGroupFormGroup } from '../../models/add-new-group-form-group';
import { Store } from '@ngxs/store';
import { Add } from '../../states/groups.action';
import { AddNewGroupCommand } from '../../commands/add-new-group.command';

@Component({
  selector: 'app-add-new-group-dialog',
  templateUrl: './add-new-group-dialog.component.html',
  styleUrls: ['./add-new-group-dialog.component.scss'],
})
export class AddNewGroupDialogComponent {
  addNewGroupForm!: FormGroup<AddNewGroupFormGroup>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.addNewGroupForm = fb.group<AddNewGroupFormGroup>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (!this.addNewGroupForm.valid) return;

    this.store.dispatch(
      new Add(this.addNewGroupForm.value as AddNewGroupCommand)
    );
  }
}
