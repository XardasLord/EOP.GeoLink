import { PageEvent } from '@angular/material/paginator';
import { ReportOpenMode } from '../models/open-mode.enum';

const prefix = '[Reports]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor(public includeReportsCount = true) {}
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(public event: PageEvent) {}
}

export class SetOpenMode {
  static readonly type = `${prefix} ${SetOpenMode.name}`;

  constructor(
    public openMode: ReportOpenMode,
    public clusterLevel: number | null = null,
    public idCluster: number | null = null
  ) {}
}
