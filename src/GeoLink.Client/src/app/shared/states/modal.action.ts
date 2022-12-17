import { GroupModel } from '../../features/administrations/models/group.model';
import { RoleModel } from '../../features/administrations/models/role.model';

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

export class OpenAddEditRoleDialog {
  constructor(public role?: RoleModel) {}
  static readonly type = `${prefix} ${OpenAddEditRoleDialog.name}`;
}

export class CloseAddEditRoleDialog {
  static readonly type = `${prefix} ${CloseAddEditRoleDialog.name}`;
}
