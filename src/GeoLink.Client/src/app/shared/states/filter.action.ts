import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import { QuickFiltersModel } from '../models/filters/quick-filters.model';

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

export class LoadQuickFilters {
  static readonly type = `${prefix} ${LoadQuickFilters.name}`;
}

export class LoadQuickFilter {
  static readonly type = `${prefix} ${LoadQuickFilter.name}`;

  constructor(public model: QuickFiltersModel) {}
}

export class SaveQuickFilters {
  static readonly type = `${prefix} ${SaveQuickFilters.name}`;

  constructor(public payload: QuickFiltersModel) {}
}

export class DeleteQuickFilter {
  static readonly type = `${prefix} ${DeleteQuickFilter.name}`;

  constructor(public id: number) {}
}
