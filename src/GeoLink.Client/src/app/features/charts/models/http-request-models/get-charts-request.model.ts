import { AttributeFilterModel } from '../../../../shared/models/filters/attribute-filter.model';

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
  attributeFilters: AttributeFilterModel[];
}
