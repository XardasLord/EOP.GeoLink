import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { MessageStatusEnum } from './message-status.enum';

@Injectable()
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  display(message: string, messageStatus: MessageStatusEnum): void {
    if (
      messageStatus === MessageStatusEnum.OK ||
      messageStatus === MessageStatusEnum.Warning ||
      messageStatus === MessageStatusEnum.Error
    ) {
      this.snackBar.open(`Błąd podczas komunikacji z API - ${message}`);
    }
  }
}
