import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import { MapFiltersModel } from '../../features/maps/models/map-filters.model';
import { QuickFilterModel } from '../models/filters/quick-filter.model';

export interface FiltersStateModel {
  mapFilters: MapFiltersModel;
  // selectedObjectMapFilters: MapFilterModel[];
  // selectedDeviceMapFilters: MapFilterModel[];
  // selectedRegionMapFilters: MapFilterModel[];
  // selectedStatusMapFilters: MapFilterModel[];
  filterAttributeModels: FilterAttributeModel[];
  quickFilterModels: QuickFilterModel[];
}
