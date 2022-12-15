import { ModalStateModel } from './modal.state.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddNewGroupDialogComponent } from '../../features/administrations/components/add-new-group-dialog/add-new-group-dialog.component';
import { OpenAddNewGroupDialog } from './modal.action';

const MODAL_STATE_TOKEN = new StateToken<ModalStateModel>('modal');

@State<ModalStateModel>({
  name: MODAL_STATE_TOKEN,
})
@Injectable()
export class ModalState {
  private addNewGroupDialogRef?: MatDialogRef<AddNewGroupDialogComponent>;

  private readonly addNewGroupDialogConfig = new MatDialogConfig();

  constructor(
    private zone: NgZone,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.addNewGroupDialogConfig = {
      width: '320px',
    };
  }

  @Action(OpenAddNewGroupDialog)
  openAddNewGroupDialog(
    ctx: StateContext<ModalStateModel>,
    _: OpenAddNewGroupDialog
  ) {
    this.closeDialog(this.addNewGroupDialogRef);

    return this.zone.run(
      () =>
        (this.addNewGroupDialogRef = this.dialog.open(
          AddNewGroupDialogComponent,
          {
            ...this.addNewGroupDialogConfig,
          }
        ))
    );
  }

  // @Action(OpenEditEmployeeDialog)
  // openEditEmployeeDialog(ctx: StateContext<ModalStateModel>, action: OpenEditEmployeeDialog) {
  //   this.closeDialog(this.editEmployeeDialogRef);
  //
  //   return this.zone.run(
  //     () =>
  //       (this.editEmployeeDialogRef = this.dialog.open(EditEmployeeDialogComponent, {
  //         ...this.editEmployeeDialogConfig,
  //         data: action.employee,
  //       }))
  //   );
  // }

  private closeDialog<T>(dialogRef: MatDialogRef<T> | undefined): void {
    if (dialogRef) {
      dialogRef.close();
      dialogRef = undefined;
    }
  }
}
