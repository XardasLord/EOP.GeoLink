import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';

const prefix = '[Filters]';

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

  constructor(public filterAttributeModel: FilterAttributeModel[]) {}
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
