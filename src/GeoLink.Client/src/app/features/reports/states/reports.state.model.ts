import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';

export interface ReportsStateModel {
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponse<ReportModel[]>;
}
