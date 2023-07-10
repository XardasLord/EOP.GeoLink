import { LogModel } from '../models/log.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';

export interface LogsStateModel {
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponse<LogModel[]>;
}
