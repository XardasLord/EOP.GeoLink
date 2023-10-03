import { PageEvent } from '@angular/material/paginator';

const prefix = '[Analytics]';

export class LoadAvailableAnalytics {
  static readonly type = `${prefix} ${LoadAvailableAnalytics.name}`;
}

export class LoadAnalytic {
  static readonly type = `${prefix} ${LoadAnalytic.name}`;

  constructor(
    public idAnalytic: number,
    public includeAnalyticsCount = true
  ) {}
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(
    public idAnalytic: number,
    public event: PageEvent
  ) {}
}

export class LoadConjunctions {
  static readonly type = `${prefix} ${LoadConjunctions.name}`;
}

export class LoadAlgorithms {
  static readonly type = `${prefix} ${LoadAlgorithms.name}`;
}
