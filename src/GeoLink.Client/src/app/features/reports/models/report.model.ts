import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';

export interface ReportModel {
  object: string;
  device: string;
  ipAddress: string;
  objectNumber: number;
  objectName: string;
  region: string;
  tan: string;
  status: MapObjectStatusTypeEnum;
  availability: number;
}
