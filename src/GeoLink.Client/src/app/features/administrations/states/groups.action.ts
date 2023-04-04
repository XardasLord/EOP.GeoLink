import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { EditGroupCommand } from '../models/commands/edit-group.command';

const prefix = '[Groups]';

export class LoadPrivileges {
  static readonly type = `${prefix} ${LoadPrivileges.name}`;
}

export class Add {
  constructor(public command: AddNewGroupCommand) {}
  static readonly type = `${prefix} ${Add.name}`;
}

export class Edit {
  constructor(public groupId: number, public command: EditGroupCommand) {}
  static readonly type = `${prefix} ${Edit.name}`;
}
