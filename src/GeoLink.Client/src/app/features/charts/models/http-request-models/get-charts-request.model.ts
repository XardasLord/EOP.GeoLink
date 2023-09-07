import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';

export interface GetChartsRequestModel {
  chartTypes: string[];
  timeExtent: number;
  // dateEnd: string;
  lvl: number | null;
  idCluster: number | null;
  objectFilters: number[];
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: FilterAttributeModel[];
}
