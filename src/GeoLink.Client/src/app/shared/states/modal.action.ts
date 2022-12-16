import { GroupModel } from '../../features/administrations/models/group.model';

const prefix = '[Modal]';

export class OpenAddNewGroupDialog {
  static readonly type = `${prefix} ${OpenAddNewGroupDialog.name}`;
}

export class CloseAddNewGroupDialog {
  static readonly type = `${prefix} ${CloseAddNewGroupDialog.name}`;
}

export class OpenEditGroupDialog {
  constructor(public group: GroupModel) {}
  static readonly type = `${prefix} ${OpenEditGroupDialog.name}`;
}

export class CloseEditGroupDialog {
  static readonly type = `${prefix} ${CloseEditGroupDialog.name}`;
}
