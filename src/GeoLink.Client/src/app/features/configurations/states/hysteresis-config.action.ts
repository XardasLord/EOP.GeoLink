import { SaveHysteresisConfigCommand } from '../models/commands/save-hysteresis-config.command';

const prefix = '[HysteresisConfig]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Save {
  constructor(public command: SaveHysteresisConfigCommand) {}

  static readonly type = `${prefix} ${Save.name}`;
}
