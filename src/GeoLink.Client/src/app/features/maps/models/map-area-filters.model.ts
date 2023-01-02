export interface MapAreaFiltersModel {
  name: string;
  completed: boolean;
  allNestedFiltersCompleted: boolean;
  nestedFilters?: MapAreaFiltersModel[];
}
