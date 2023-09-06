import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';

export interface GetClusterInfoRequestModel {
  idCluster: number;
  lvl: number;
  objType: number;
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: FilterAttributeModel[];
}
