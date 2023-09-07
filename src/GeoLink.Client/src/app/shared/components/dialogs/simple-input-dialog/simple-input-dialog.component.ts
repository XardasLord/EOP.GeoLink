import { Component, Inject } from '@angular/core';
import { SimpleInputDialogAction, SimpleInputDialogDataModel } from './simple-input-dialog-data.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-input-dialog',
  templateUrl: './simple-input-dialog.component.html',
  styleUrls: ['./simple-input-dialog.component.scss'],
})
export class SimpleInputDialogComponent {
  SimpleInputDialogAction = SimpleInputDialogAction;

  form = this.fb.group({});

  constructor(
    public dialogRef: MatDialogRef<SimpleInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleInputDialogDataModel,
    private fb: FormBuilder
  ) {
    this.data.inputs.forEach((input, i) => {
      switch (input.type) {
        case 'number':
          this.form.addControl(
            `${input.controlName ?? i}`,
            new FormControl<number | null>(input.initValue != null ? +input.initValue : null, input.options)
          );
          break;
        case 'boolean':
          this.form.addControl(`${input.controlName ?? i}`, new FormControl<boolean>(input.initValue, input.options));
          break;
        default:
          this.form.addControl(
            `${input.controlName ?? i}`,
            new FormControl<string>(input.initValue ? input.initValue.toString() : '', input.options)
          );
          break;
      }
    });
    if (this.data.validateInstantly) {
      this.form.markAsDirty();
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.data.submitAction) {
        this.data.submitAction(this.form.value);
      }
      this.dialogRef.close();
    }
  }

  onCancel() {
    if (this.data.cancelAction) {
      this.data.cancelAction();
    }
    this.dialogRef.close();
  }

  onAlternative() {
    if (this.data.alternativeAction) {
      this.data.alternativeAction(this.form);
    }
  }

  isFieldOptional(controlName: string): boolean {
    return !this.form.get(controlName)!.hasValidator(Validators.required);
  }
}
