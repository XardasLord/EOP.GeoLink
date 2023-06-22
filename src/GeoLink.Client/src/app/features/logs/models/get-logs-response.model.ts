import { LogModel } from './log.model';

export interface GetLogsResponseModel {
  logCount: number;
  logOffset: 0;
  logs: LogModel[];
}
