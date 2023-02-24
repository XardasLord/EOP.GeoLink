import { SaveLogsStorageConfigCommand } from '../models/commands/save-logs-storage-config.command';

const prefix = '[LogsStorageConfig]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Save {
  constructor(public command: SaveLogsStorageConfigCommand) {}

  static readonly type = `${prefix} ${Save.name}`;
}
