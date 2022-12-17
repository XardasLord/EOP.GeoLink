import { ModalStateModel } from './modal.state.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddNewGroupDialogComponent } from '../../features/administrations/components/add-new-group-dialog/add-new-group-dialog.component';
import {
  CloseAddEditRoleDialog,
  CloseAddNewGroupDialog,
  CloseEditGroupDialog,
  OpenAddEditRoleDialog,
  OpenAddNewGroupDialog,
  OpenEditGroupDialog,
} from './modal.action';
import { EditGroupDialogComponent } from '../../features/administrations/components/edit-group-dialog/edit-group-dialog.component';
import { AddEditRoleDialogComponent } from '../../features/administrations/components/add-edit-role-dialog/add-edit-role-dialog.component';

const MODAL_STATE_TOKEN = new StateToken<ModalStateModel>('modal');

@State<ModalStateModel>({
  name: MODAL_STATE_TOKEN,
})
@Injectable()
export class ModalState {
  private addNewGroupDialogRef?: MatDialogRef<AddNewGroupDialogComponent>;
  private editGroupDialogRef?: MatDialogRef<EditGroupDialogComponent>;
  private addEditRoleDialogRef?: MatDialogRef<AddEditRoleDialogComponent>;

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

  @Action(OpenAddNewGroupDialog)
  openAddNewGroupDialog(ctx: StateContext<ModalStateModel>, _: OpenAddNewGroupDialog) {
    this.closeDialog(this.addNewGroupDialogRef);

    return this.zone.run(
      () =>
        (this.addNewGroupDialogRef = this.dialog.open(AddNewGroupDialogComponent, {
          ...this.addNewGroupDialogConfig,
        }))
    );
  }

  @Action(OpenEditGroupDialog)
  OpenEditGroupDialog(ctx: StateContext<ModalStateModel>, action: OpenEditGroupDialog) {
    this.closeDialog(this.addNewGroupDialogRef);

    return this.zone.run(
      () =>
        (this.editGroupDialogRef = this.dialog.open(EditGroupDialogComponent, {
          ...this.editGroupDialogConfig,
          data: action.group,
        }))
    );
  }

  @Action(OpenAddEditRoleDialog)
  OpenAddEditRoleDialog(ctx: StateContext<ModalStateModel>, action: OpenAddEditRoleDialog) {
    this.closeDialog(this.addNewGroupDialogRef);

    return this.zone.run(
      () =>
        (this.addEditRoleDialogRef = this.dialog.open(AddEditRoleDialogComponent, {
          ...this.addEditRoleDialogConfig,
          data: action.role,
        }))
    );
  }

  @Action(CloseAddNewGroupDialog)
  closeAddNewGroupDialog(ctx: StateContext<ModalStateModel>, _: CloseAddNewGroupDialog) {
    this.closeDialog(this.addNewGroupDialogRef);
  }

  @Action(CloseEditGroupDialog)
  closeEditGroupDialog(ctx: StateContext<ModalStateModel>, _: CloseEditGroupDialog) {
    this.closeDialog(this.editGroupDialogRef);
  }

  @Action(CloseAddEditRoleDialog)
  closeAddEditRoleDialog(ctx: StateContext<ModalStateModel>, _: CloseAddEditRoleDialog) {
    this.closeDialog(this.addEditRoleDialogRef);
  }

  private closeDialog<T>(dialogRef: MatDialogRef<T> | undefined): void {
    if (dialogRef) {
      dialogRef.close();
      dialogRef = undefined;
    }
  }
}
