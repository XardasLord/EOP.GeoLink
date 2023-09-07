import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';

export interface GetReportPreviewRequestModel {
  count: number;
  doCount: number;
  timeExtent: number;
  offset: number;
  lvl: number | null;
  idCluster: number | null;
  objectFilters: number[];
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: FilterAttributeModel[];
}
