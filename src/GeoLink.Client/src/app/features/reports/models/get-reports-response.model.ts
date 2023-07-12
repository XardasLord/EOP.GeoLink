import { ReportModel } from './report.model';

export interface GetReportsResponseModel {
  reportCount: number;
  reports: ReportModel[];
}
