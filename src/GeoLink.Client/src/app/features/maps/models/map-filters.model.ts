import { MapFilterModel } from './map-filter-model';

export interface MapFiltersModel {
  objectFilters: MapFilterModel[];
  regionFilters: MapFilterModel[];
  statusFilters: MapFilterModel[];
}
