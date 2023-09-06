import { BboxModel } from '../../../../shared/models/filters/bbox.model';
import { AttributeFilterModel } from '../../../../shared/models/filters/attribute-filter.model';

export interface GetObjectsRequestModel {
  bbox: BboxModel;
  objectFilters: number[];
  deviceFilters: number[];
  regionFilters: number[];
  statusFilters: number[];
  attributeFilters: AttributeFilterModel[];
}
