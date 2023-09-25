import { PageEvent } from '@angular/material/paginator';

const prefix = '[Logs]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(public event: PageEvent) {}
}

export class RequestForCsvLogs {
  static readonly type = `${prefix} ${RequestForCsvLogs.name}`;
}

export class CheckCsvLogStatus {
  static readonly type = `${prefix} ${CheckCsvLogStatus.name}`;

  constructor(public reportIdentifierKey: string) {}
}
