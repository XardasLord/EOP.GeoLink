export interface MapFilterModel {
  id: number;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters' | 'RegionFilters' | 'StatusFilters';
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
