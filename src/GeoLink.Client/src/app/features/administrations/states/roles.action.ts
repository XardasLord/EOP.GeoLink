import { AddRoleCommand } from '../models/commands/add-role.command';
import { EditRoleCommand } from '../models/commands/edit-role.command';

const prefix = '[Roles]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Add {
  constructor(public command: AddRoleCommand) {}
  static readonly type = `${prefix} ${Add.name}`;
}

export class Edit {
  constructor(public roleId: number, public command: EditRoleCommand) {}
  static readonly type = `${prefix} ${Edit.name}`;
}
