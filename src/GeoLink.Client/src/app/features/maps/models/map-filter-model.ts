import { FilterTypeEnum } from '../../../shared/models/filters/filter-type.enum';

export interface MapFilterModel {
  idFilter: number | null;
  parentId: number | null;
  apiValue: number | null;
  name: string;
  filters: MapFilterModel[];
  apiFilterType: FilterTypeEnum;
  enabled: boolean;
  completed: boolean;
  allChildFiltersCompleted: boolean;
}
