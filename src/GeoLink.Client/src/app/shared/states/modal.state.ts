import { ModalStateModel } from './modal.state.model';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {
  CloseEditPrivilegesDialogForGroup,
  CloseEditPrivilegesDialogForRole,
  CloseModal,
  OpenEditPrivilegesDialogForGroup,
  OpenEditPrivilegesDialogForRole,
  OpenEditStatusConfigDialog,
} from './modal.action';
import { ManagePrivilegesDialogComponent } from '../../features/administrations/components/manage-privileges-dialog/manage-privileges-dialog.component';
import { EditStatusConfigDialogComponent } from '../../features/configurations/components/dialogs/edit-status-config-dialog/edit-status-config-dialog.component';

const MODAL_STATE_TOKEN = new StateToken<ModalStateModel>('modal');

@State<ModalStateModel>({
  name: MODAL_STATE_TOKEN,
})
@Injectable()
export class ModalState {
  private dialogRef?: MatDialogRef<ManagePrivilegesDialogComponent | EditStatusConfigDialogComponent>;

  private readonly managePrivilegesDialogConfig = new MatDialogConfig();
  private readonly editStatusConfigDialogConfig = new MatDialogConfig();

  constructor(
    private zone: NgZone,
    private dialog: MatDialog
  ) {
    this.managePrivilegesDialogConfig = {
      width: '460px',
    };
    this.editStatusConfigDialogConfig = {
      width: '460px',
    };
  }

  @Action(OpenEditPrivilegesDialogForGroup)
  openEditPrivilegesDialogForGroup(ctx: StateContext<ModalStateModel>, action: OpenEditPrivilegesDialogForGroup) {
    this.closeDialog(this.dialogRef);
    return this.zone.run(
      () =>
        (this.dialogRef = this.dialog.open(ManagePrivilegesDialogComponent, {
          ...this.managePrivilegesDialogConfig,
          data: {
            isGroup: true,
            isRole: false,
            model: action.group,
          },
        }))
    );
  }

  @Action(OpenEditPrivilegesDialogForRole)
  openEditPrivilegesDialogForRole(ctx: StateContext<ModalStateModel>, action: OpenEditPrivilegesDialogForRole) {
    this.closeDialog(this.dialogRef);
    return this.zone.run(
      () =>
        (this.dialogRef = this.dialog.open(ManagePrivilegesDialogComponent, {
          ...this.managePrivilegesDialogConfig,
          data: {
            isGroup: false,
            isRole: true,
            model: action.role,
          },
        }))
    );
  }

  @Action(OpenEditStatusConfigDialog)
  openEditStatusConfigDialog(ctx: StateContext<ModalStateModel>, action: OpenEditStatusConfigDialog) {
    this.closeDialog(this.dialogRef);
    return this.zone.run(
      () =>
        (this.dialogRef = this.dialog.open(EditStatusConfigDialogComponent, {
          ...this.editStatusConfigDialogConfig,
          data: {
            sourceName: action.attributeSourceName,
            model: action.statusConfig,
          },
        }))
    );
  }

  @Action(CloseEditPrivilegesDialogForGroup)
  closeEditPrivilegesDialogForGroup(ctx: StateContext<ModalStateModel>, _: CloseEditPrivilegesDialogForGroup) {
    this.closeDialog(this.dialogRef);
  }

  @Action(CloseEditPrivilegesDialogForRole)
  closeEditPrivilegesDialogForRole(ctx: StateContext<ModalStateModel>, _: CloseEditPrivilegesDialogForRole) {
    this.closeDialog(this.dialogRef);
  }

  @Action(CloseModal)
  closeModal(ctx: StateContext<ModalStateModel>) {
    this.closeDialog(this.dialogRef);
  }

  private closeDialog<T>(dialogRef: MatDialogRef<T> | undefined): void {
    if (dialogRef) {
      dialogRef.close();
      dialogRef = undefined;
    }
  }
}
