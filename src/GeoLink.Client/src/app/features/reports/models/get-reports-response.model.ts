import { ReportModel } from './report.model';

export interface GetReportsResponseModel {
  reportCount: number;
  data: ReportModel[];
}
