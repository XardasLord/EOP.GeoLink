import { MapFiltersModel } from '../models/map-filters.model';
import { MapFilterModel } from '../models/map-filter-model';

export interface MapsStateModel {
  mapFilters: MapFiltersModel;
  selectedObjectsMapFilters: MapFilterModel[];
  selectedDeviceMapFilters: MapFilterModel[];
  selectedRegionMapFilter: MapFilterModel[];
  selectedStatusMapFilters: MapFilterModel[];
}
