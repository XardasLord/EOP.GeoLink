export interface QuickFilterModel {
  id: number | undefined;
  name: string;
  objectFilterIds: number[];
  deviceFilterIds: number[];
  regionFilterIds: number[];
  statusFilterIds: number[];
}
