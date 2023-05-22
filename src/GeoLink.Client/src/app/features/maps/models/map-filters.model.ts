import { MapObjectFiltersModel } from './map-object-filter.model';
import { MapRegionFiltersModel } from './map-region-filters.model';

export interface MapFiltersModel {
  objectFilters: MapObjectFiltersModel[];
  regionFilters: MapRegionFiltersModel[];
  statusFilters: MapRegionFiltersModel[];
}
