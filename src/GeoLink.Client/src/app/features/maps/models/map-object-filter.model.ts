import { MapFilterModel } from './map-filter-model';

export interface MapObjectFiltersModel {
  dictionaryEndpoint: '/api/map/getObjectTypes' | 'api/map/getDeviceTypes';
  filters: MapFilterModel[];
}
