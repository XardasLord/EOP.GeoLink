import { LogModel } from './log.model';

export interface GetLogsResponseModel {
  logCount: number;
  logs: LogModel[];
}
