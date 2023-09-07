import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import { MapFiltersModel } from '../../features/maps/models/map-filters.model';

export interface FiltersStateModel {
  mapFilters: MapFiltersModel;
  selectedObjectMapFilters: MapFilterModel[];
  selectedDeviceMapFilters: MapFilterModel[];
  selectedRegionMapFilters: MapFilterModel[];
  selectedStatusMapFilters: MapFilterModel[];
  filterAttributeModels: FilterAttributeModel[];
}
