import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponseWithoutPaginationVo } from '../../../shared/models/pagination/rest.response';
import { SystemAvailabilityModel } from '../models/system-availability.model';
import { SystemDataFieldModel } from '../models/system-data-field.model';

export interface SystemsAvailabilityStateModel {
  restQuery: RestQueryVo;
  restQueryResponseSystemsAvailability: RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>;
  restQueryResponseSystemsDataFields: RestQueryResponseWithoutPaginationVo<SystemDataFieldModel[]>;
}
