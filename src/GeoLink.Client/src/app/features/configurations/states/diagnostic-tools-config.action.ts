import { SaveDiagnosticToolsConfigCommand } from '../models/commands/save-diagnostic-tools-config.command';

const prefix = '[DiagnosticToolsConfig]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class Save {
  constructor(public command: SaveDiagnosticToolsConfigCommand) {}

  static readonly type = `${prefix} ${Save.name}`;
}
