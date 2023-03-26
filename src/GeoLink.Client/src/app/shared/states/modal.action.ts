import { RoleModel } from '../../features/administrations/models/role.model';

const prefix = '[Modal]';

export class OpenChangePrivilegesDialog {
  constructor(public role?: RoleModel) {}
  static readonly type = `${prefix} ${OpenChangePrivilegesDialog.name}`;
}

export class CloseChangePrivilegesDialog {
  static readonly type = `${prefix} ${CloseChangePrivilegesDialog.name}`;
}
