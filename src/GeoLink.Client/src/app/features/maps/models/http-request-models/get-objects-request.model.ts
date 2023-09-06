import { BboxModel } from '../../../../shared/models/filters/bbox.model';
import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';

export interface GetObjectsRequestModel {
  bbox: BboxModel;
  objectFilters: number[];
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: FilterAttributeModel[];
}
