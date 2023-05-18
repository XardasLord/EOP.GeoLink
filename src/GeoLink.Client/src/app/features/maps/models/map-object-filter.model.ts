import { MapFilterModel } from './map-filter-model';

export interface MapObjectFiltersModel {
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters';
  dictionaryEndpoint: '/api/map/getObjectTypes' | 'api/map/getDeviceTypes';
  filters: MapFilterModel[];
}
