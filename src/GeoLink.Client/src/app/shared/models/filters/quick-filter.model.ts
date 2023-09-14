export interface QuickFilterModel {
  id: number | undefined;
  name: string;
  objectFilters: number[];
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
}
