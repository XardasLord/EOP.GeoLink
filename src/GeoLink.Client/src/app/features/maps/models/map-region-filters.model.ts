import { MapFilterModel } from './map-filter-model';

export interface MapRegionFiltersModel {
  apiFilterType: 'RegionFilters';
  dictionaryEndpoint: '/api/settings/getRegions';
  filters: MapFilterModel[];
}
