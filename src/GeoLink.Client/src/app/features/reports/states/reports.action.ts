import { PageEvent } from '@angular/material/paginator';
import { MapFilterModel } from '../../maps/models/map-filter-model';
import { ReportOpenMode } from '../models/open-mode.enum';
import { SearchFilterModel } from '../../../shared/models/filters/search-filter.model';

const prefix = '[Reports]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor(public includeReportsCount = true) {}
}

export class ChangePage {
  static readonly type = `${prefix} ${ChangePage.name}`;

  constructor(public event: PageEvent) {}
}

export class ChangeFilters {
  static readonly type = `${prefix} ${ChangeFilters.name}`;

  constructor(
    public selectedObjectMapFilters: MapFilterModel[],
    public selectedDeviceMapFilters: MapFilterModel[],
    public selectedRegionMapFilters: MapFilterModel[],
    public selectedStatusMapFilters: MapFilterModel[]
  ) {}
}

export class ChangeSearchFilters {
  static readonly type = `${prefix} ${ChangeSearchFilters.name}`;

  constructor(public searchFilterModel: SearchFilterModel) {}
}

export class SetOpenMode {
  static readonly type = `${prefix} ${SetOpenMode.name}`;

  constructor(
    public openMode: ReportOpenMode,
    public clusterLevel: number | null = null,
    public idCluster: number | null = null
  ) {}
}
