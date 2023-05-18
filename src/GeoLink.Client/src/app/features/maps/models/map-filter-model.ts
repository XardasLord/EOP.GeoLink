export interface MapFilterModel {
  id: number | null;
  name: string;
  filters: MapFilterModel[];
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
