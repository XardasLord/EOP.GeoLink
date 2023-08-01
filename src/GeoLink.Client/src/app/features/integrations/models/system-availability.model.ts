import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';

export interface SystemAvailabilityModel {
  systemTypeName: string;
  systems: SystemAvailabilityData[];
}

export interface SystemAvailabilityData {
  idSystem: number;
  systemName: string;
  description: string;
  healthCheckMethod: string;
  status: MapObjectStatusTypeEnum;
}
