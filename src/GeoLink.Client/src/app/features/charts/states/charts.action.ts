import { ChartOpenMode } from '../models/open-mode.enum';

const prefix = '[Charts]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor() {}
}

export class SetOpenMode {
  static readonly type = `${prefix} ${SetOpenMode.name}`;

  constructor(
    public openMode: ChartOpenMode,
    public clusterLevel: number | null = null,
    public idCluster: number | null = null
  ) {}
}
