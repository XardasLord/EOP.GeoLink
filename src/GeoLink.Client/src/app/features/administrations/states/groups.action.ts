import { AddNewGroupCommand } from '../commands/add-new-group.command';

const prefix = '[Groups]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Add {
  constructor(public group: AddNewGroupCommand) {}
  static readonly type = `${prefix} ${Add.name}`;
}
