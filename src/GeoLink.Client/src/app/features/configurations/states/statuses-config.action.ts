import { SaveStatusConfigCommand } from '../models/commands/save-status-config.command';

const prefix = '[StatusesConfig]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Save {
  constructor(public command: SaveStatusConfigCommand) {}

  static readonly type = `${prefix} ${Save.name}`;
}
