import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleConfirmDialogAction, SimpleConfirmDialogDataModel } from './simple-confirm-dialog-data.model';

@Component({
  selector: 'app-simple-confirm-dialog',
  templateUrl: './simple-confirm-dialog.component.html',
  styleUrls: ['./simple-confirm-dialog.component.scss'],
})
export class SimpleConfirmDialogComponent {
  SimpleConfirmDialogAction = SimpleConfirmDialogAction;

  constructor(
    public dialogRef: MatDialogRef<SimpleConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleConfirmDialogDataModel
  ) {}

  onPrimaryAction() {
    if (this.data.primaryAction) {
      this.data.primaryAction();
    }
    this.dialogRef.close();
  }

  onSecondaryAction() {
    if (this.data.secondaryAction) {
      this.data.secondaryAction();
    }
    this.dialogRef.close();
  }
}
