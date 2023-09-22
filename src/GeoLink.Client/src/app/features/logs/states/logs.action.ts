import { PageEvent } from '@angular/material/paginator';

const prefix = '[Logs]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(public event: PageEvent) {}
}

export class DownloadAsCsv {
  static readonly type = `${prefix} ${DownloadAsCsv.name}`;
}
