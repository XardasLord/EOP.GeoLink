import { AttributeFilterModel } from '../../../../shared/models/filters/attribute-filter.model';

export interface GetClusterInfoRequestModel {
  idCluster: number;
  lvl: number;
  objType: number;
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: AttributeFilterModel[];
}
