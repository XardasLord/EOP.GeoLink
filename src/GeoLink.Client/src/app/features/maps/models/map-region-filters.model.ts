import { MapFilterModel } from './map-filter-model';

export interface MapRegionFiltersModel {
  dictionaryEndpoint: '/api/settings/getRegions';
  filters: MapFilterModel[];
}
