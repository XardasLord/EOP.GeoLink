export interface MapFilterModel {
  id: number;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters' | 'RegionFilters';
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
