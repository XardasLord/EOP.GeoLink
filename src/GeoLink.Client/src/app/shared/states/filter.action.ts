import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import { QuickFilterModel } from '../models/filters/quick-filter.model';
import { FilterTypeEnum } from '../models/filters/filter-type.enum';

const prefix = '[Filters]';

export class LoadMapFilters {
  static readonly type = `${prefix} ${LoadMapFilters.name}`;
}

export class ToggleMapFilter {
  static readonly type = `${prefix} ${ToggleMapFilter.name}`;

  constructor(
    public filterId: number,
    public filterType: FilterTypeEnum,
    public checked: boolean = true
  ) {}
}

export class RegionMapFiltersSelectionChange {
  static readonly type = `${prefix} ${RegionMapFiltersSelectionChange.name}`;

  constructor(public selectedMapFilters: MapFilterModel[]) {}
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

  constructor(public model: QuickFilterModel) {}
}

export class SaveQuickFilters {
  static readonly type = `${prefix} ${SaveQuickFilters.name}`;

  constructor(public payload: QuickFilterModel) {}
}

export class DeleteQuickFilter {
  static readonly type = `${prefix} ${DeleteQuickFilter.name}`;

  constructor(public id: number) {}
}
