export interface MapObjectFiltersModel {
  name: string;
  completed: boolean;
  allNestedFiltersCompleted: boolean;
  nestedFilters?: MapObjectFiltersModel[];
}
