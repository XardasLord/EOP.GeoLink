import { LogStatusTypeEnum } from '../../../shared/models/log-status-type.enum';

export interface LogModel {
  timestamp: Date;
  type: string;
  eventInfo: string;
  status: LogStatusTypeEnum;
}
