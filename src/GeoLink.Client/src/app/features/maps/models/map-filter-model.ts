export interface MapFilterModel {
  id: number;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters' | 'RegionFilters' | 'StatusFilters' | 'IpFilters';
  enabled: boolean;
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
