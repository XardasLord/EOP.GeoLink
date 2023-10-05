import { ChartOpenMode } from '../models/open-mode.enum';

const prefix = '[Charts]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor(public timeExtent: number = 1) {}
}

export class ApplyFilters {
  static readonly type = `${prefix} ${ApplyFilters.name}`;

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
