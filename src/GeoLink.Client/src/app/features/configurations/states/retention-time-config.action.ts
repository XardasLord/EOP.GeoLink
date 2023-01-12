import { SaveRetentionTimeConfigCommand } from '../models/commands/save-retention-time-config.command';

const prefix = '[RetentionTimeConfig]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Save {
  constructor(public command: SaveRetentionTimeConfigCommand) {}

  static readonly type = `${prefix} ${Save.name}`;
}
