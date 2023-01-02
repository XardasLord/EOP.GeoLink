import { MapObjectFiltersModel } from './map-object-filter.model';
import { MapAreaFiltersModel } from './map-area-filters.model';

export interface MapFiltersModel {
  objectFilters: MapObjectFiltersModel[];
  areaFilters: MapAreaFiltersModel[];
}
