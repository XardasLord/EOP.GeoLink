import { PageEvent } from '@angular/material/paginator';

const prefix = '[Reports]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(public event: PageEvent) {}
}
