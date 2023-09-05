import { MapFilterModel } from '../models/map-filter-model';

const prefix = '[Maps]';

export class LoadMapFilters {
  static readonly type = `${prefix} ${LoadMapFilters.name}`;
}

export class ObjectMapFiltersSelectionChange {
  static readonly type = `${prefix} ${ObjectMapFiltersSelectionChange.name}`;

  constructor(public selectedMapFilters: MapFilterModel[]) {}
}

export class DeviceMapFiltersSelectionChange {
  static readonly type = `${prefix} ${DeviceMapFiltersSelectionChange.name}`;

  constructor(public selectedMapFilters: MapFilterModel[]) {}
}

export class RegionMapFiltersSelectionChange {
  static readonly type = `${prefix} ${RegionMapFiltersSelectionChange.name}`;

  constructor(public selectedMapFilters: MapFilterModel[]) {}
}

export class StatusMapFiltersSelectionChange {
  static readonly type = `${prefix} ${StatusMapFiltersSelectionChange.name}`;

  constructor(public selectedMapFilters: MapFilterModel[]) {}
}

export class SetInitialMapFilters {
  static readonly type = `${prefix} ${SetInitialMapFilters.name}`;

  constructor(
    public objectTypeFilters: number,
    public deviceFilters: number[],
    public regionFilters: number[],
    public statusFilters: number[]
  ) {}
}
