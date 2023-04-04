import { ModalStateModel } from './modal.state.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {
  CloseEditPrivilegesDialogForGroup,
  CloseEditPrivilegesDialogForRole,
  OpenEditPrivilegesDialogForGroup,
  OpenEditPrivilegesDialogForRole,
} from './modal.action';
import { ManagePrivilegesDialogComponent } from '../../features/administrations/components/manage-privileges-dialog/manage-privileges-dialog.component';

const MODAL_STATE_TOKEN = new StateToken<ModalStateModel>('modal');

@State<ModalStateModel>({
  name: MODAL_STATE_TOKEN,
})
@Injectable()
export class ModalState {
  private managePrivilegesDialogRef?: MatDialogRef<ManagePrivilegesDialogComponent>;

  private readonly managePrivilegesDialogConfig = new MatDialogConfig();

  constructor(private zone: NgZone, private dialog: MatDialog, private store: Store) {
    this.managePrivilegesDialogConfig = {
      width: '320px',
    };
  }

  @Action(OpenEditPrivilegesDialogForGroup)
  openEditPrivilegesDialogForGroup(ctx: StateContext<ModalStateModel>, action: OpenEditPrivilegesDialogForGroup) {
    this.closeDialog(this.managePrivilegesDialogRef);
    return this.zone.run(
      () =>
        (this.managePrivilegesDialogRef = this.dialog.open(ManagePrivilegesDialogComponent, {
          ...this.managePrivilegesDialogConfig,
          data: action.group,
        }))
    );
  }

  @Action(OpenEditPrivilegesDialogForRole)
  openEditPrivilegesDialogForRole(ctx: StateContext<ModalStateModel>, action: OpenEditPrivilegesDialogForRole) {
    this.closeDialog(this.managePrivilegesDialogRef);
    return this.zone.run(
      () =>
        (this.managePrivilegesDialogRef = this.dialog.open(ManagePrivilegesDialogComponent, {
          ...this.managePrivilegesDialogConfig,
          data: action.role,
        }))
    );
  }

  @Action(CloseEditPrivilegesDialogForGroup)
  closeEditPrivilegesDialogForGroup(ctx: StateContext<ModalStateModel>, _: CloseEditPrivilegesDialogForGroup) {
    this.closeDialog(this.managePrivilegesDialogRef);
  }

  @Action(CloseEditPrivilegesDialogForRole)
  closeEditPrivilegesDialogForRole(ctx: StateContext<ModalStateModel>, _: CloseEditPrivilegesDialogForRole) {
    this.closeDialog(this.managePrivilegesDialogRef);
  }

  private closeDialog<T>(dialogRef: MatDialogRef<T> | undefined): void {
    if (dialogRef) {
      dialogRef.close();
      dialogRef = undefined;
    }
  }
}
