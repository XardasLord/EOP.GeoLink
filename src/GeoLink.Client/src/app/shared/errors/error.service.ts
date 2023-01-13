import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  display(message: string, status?: number): void {
    this.snackBar.open(message);
  }
}
