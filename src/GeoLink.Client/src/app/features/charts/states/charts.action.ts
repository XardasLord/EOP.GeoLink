import { MapFilterModel } from '../../maps/models/map-filter-model';
import { ChartOpenMode } from '../models/open-mode.enum';
import { FilterAttributeModel } from '../../../shared/models/filters/filter-attribute.model';

const prefix = '[Charts]';

export class Load {
  static readonly type = `${prefix} ${Load.name}`;

  constructor() {}
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

export class SetOpenMode {
  static readonly type = `${prefix} ${SetOpenMode.name}`;

  constructor(
    public openMode: ChartOpenMode,
    public clusterLevel: number | null = null,
    public idCluster: number | null = null
  ) {}
}
