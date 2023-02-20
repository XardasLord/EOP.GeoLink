import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorService } from '../../shared/errors/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService, private zone: NgZone) {}

  handleError(error: any): void {
    // if (!(error instanceof HttpErrorResponse)) {
    //   error = error.rejection; // get the error object
    // }
    // this.zone.run(
    //   // this.errorDialogService.openDialog(
    //   //   error?.message || 'Undefined client error',
    //   //   error?.status
    //   // )
    // );

    this.zone.run(() => this.errorService.display(error?.message));
    console.error('Error from global error handler', error);
  }
}
