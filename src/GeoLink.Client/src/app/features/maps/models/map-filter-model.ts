export interface MapFilterModel {
  id: number;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters' | 'RegionFilters' | 'StatusFilters';
  enabled: boolean;
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
