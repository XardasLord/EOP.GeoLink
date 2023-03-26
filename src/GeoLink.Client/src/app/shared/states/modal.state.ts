import { ModalStateModel } from './modal.state.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddNewGroupDialogComponent } from '../../features/administrations/components/add-new-group-dialog/add-new-group-dialog.component';
import { CloseChangePrivilegesDialog, OpenChangePrivilegesDialog } from './modal.action';

const MODAL_STATE_TOKEN = new StateToken<ModalStateModel>('modal');

@State<ModalStateModel>({
  name: MODAL_STATE_TOKEN,
})
@Injectable()
export class ModalState {
  private addNewGroupDialogRef?: MatDialogRef<AddNewGroupDialogComponent>;

  private readonly addNewGroupDialogConfig = new MatDialogConfig();
  private readonly editGroupDialogConfig = new MatDialogConfig();
  private readonly addEditRoleDialogConfig = new MatDialogConfig();

  constructor(private zone: NgZone, private dialog: MatDialog, private store: Store) {
    this.addNewGroupDialogConfig = {
      width: '320px',
    };

    this.editGroupDialogConfig = this.addNewGroupDialogConfig;
    this.addEditRoleDialogConfig = this.addNewGroupDialogConfig;
  }

  @Action(OpenChangePrivilegesDialog)
  OpenAddEditRoleDialog(ctx: StateContext<ModalStateModel>, action: OpenChangePrivilegesDialog) {
    this.closeDialog(this.addNewGroupDialogRef);

    // return this.zone.run(
    //   () =>
    //     (this.addEditRoleDialogRef = this.dialog.open(AddEditRoleDialogComponent, {
    //       ...this.addEditRoleDialogConfig,
    //       data: action.role,
    //     }))
    // );
  }

  @Action(CloseChangePrivilegesDialog)
  closeAddEditRoleDialog(ctx: StateContext<ModalStateModel>, _: CloseChangePrivilegesDialog) {
    // this.closeDialog(this.addEditRoleDialogRef);
  }

  private closeDialog<T>(dialogRef: MatDialogRef<T> | undefined): void {
    if (dialogRef) {
      dialogRef.close();
      dialogRef = undefined;
    }
  }
}
