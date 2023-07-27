import { MapFilterModel } from './map-filter-model';

export interface MapFiltersModel {
  objectFilters: MapFilterModel[];
  deviceFilters: MapFilterModel[];
  regionFilters: MapFilterModel[];
  statusFilters: MapFilterModel[];
  ipFilters: MapFilterModel[];
}
