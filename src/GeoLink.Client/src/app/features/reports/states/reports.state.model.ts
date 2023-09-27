import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';
import { ReportOpenMode } from '../models/open-mode.enum';

export interface ReportsStateModel {
  loading: boolean;
  openMode: ReportOpenMode;
  clusterLevel: number | null;
  idCluster: number | null;
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponse<ReportModel[]>;
  isDownloadingReport: boolean;
}
