const prefix = '[Modal]';

export class OpenAddNewGroupDialog {
  static readonly type = `${prefix} ${OpenAddNewGroupDialog.name}`;
}

export class CloseAddNewGroupDialog {
  static readonly type = `${prefix} ${CloseAddNewGroupDialog.name}`;
}
