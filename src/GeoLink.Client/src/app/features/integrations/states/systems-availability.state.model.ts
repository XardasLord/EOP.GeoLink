import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponseWithoutPaginationVo } from '../../../shared/models/pagination/rest.response';
import { SystemAvailabilityModel } from '../models/system-availability.model';

export interface SystemsAvailabilityStateModel {
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>;
}
