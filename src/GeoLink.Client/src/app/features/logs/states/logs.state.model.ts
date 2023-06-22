import { LogModel } from '../models/log.model';

export interface LogsStateModel {
  logs: LogModel[];
  logsCount: number;
  logsOffset: number;
}
