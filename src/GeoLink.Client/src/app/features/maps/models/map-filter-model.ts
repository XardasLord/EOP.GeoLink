export interface MapFilterModel {
  id: number | null;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: 'ObjectTypeFilters' | 'DeviceFilters' | 'RegionFilters';
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
