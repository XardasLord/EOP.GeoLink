import { PageEvent } from '@angular/material/paginator';
import { ReportOpenMode } from '../models/open-mode.enum';

const prefix = '[Reports]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor(public includeReportsCount = true) {}
}

export class ApplyFilters {
  static readonly type = `${prefix} ${ApplyFilters.name}`;

  constructor() {}
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

export class RequestForCsvReport {
  static readonly type = `${prefix} ${RequestForCsvReport.name}`;
}

export class CheckCsvReportStatus {
  static readonly type = `${prefix} ${CheckCsvReportStatus.name}`;

  constructor(public reportIdentifierKey: string) {}
}
