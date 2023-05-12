import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';
import { MapObjectTypeEnum } from '../../../shared/models/map-object-type.enum';
import { MapDeviceTypeEnum } from '../../../shared/models/map-device-type.enum';

export interface MapClusterObjectModel {
  clusters: MapClusterModel[];
  objects: MapObjectModel[];
}

export interface MapClusterModel {
  idClust: number;
  level: number;
  regions: number[];
  objCount: number;
  pointLon: number;
  pointLat: number;
  bBoxGeom: number[];
  objectGroups: MapObjectGroupModel[];
}

export interface MapObjectModel {
  idObj: number;
  lat: number;
  lon: number;
  objType: MapObjectTypeEnum;
  idStatus: MapObjectStatusTypeEnum;
  region: number;
  name: string;
  nrExpl: string;
  devices: DeviceModel[];
  devGroupStatus: DeviceGroupStatus[];
}

export interface MapObjectGroupModel {
  objType: MapObjectTypeEnum;
  objCount: number;
  devStat: DeviceStatisticsModel[];
}

export interface DeviceStatisticsModel {
  idStat: number;
  stCount: number;
}

export interface DeviceModel {
  idDev: number;
  devType: MapDeviceTypeEnum;
  producer: string;
  model: string;
  idStatus: MapObjectStatusTypeEnum;
}

export interface DeviceDetailsModel {
  idDev: number;
  devType: MapDeviceTypeEnum;
  producer: string;
  model: string;
  params: DeviceDetailsParamsModel[];
  subDevId: number[];
}

export interface DeviceDetailsParamsModel {
  name: string;
  value: string;
  status: MapObjectStatusTypeEnum;
  subParams: DeviceDetailsSubParamsModel[];
}

export interface DeviceDetailsSubParamsModel {
  name: string;
  value: string;
  status: MapObjectStatusTypeEnum;
}

export interface MapClusterGroupDetails {
  idClust: number;
  level: number;
  objType: MapObjectTypeEnum;
  objCount: number;
  devGroups: MapClusterDeviceGroupDetails[];
}

export interface MapClusterDeviceGroupDetails {
  devType: MapDeviceTypeEnum;
  devCount: number;
  devStat: DeviceStatisticsModel[];
}

export interface DeviceGroupStatus {
  devGroup: string;
  idStatus: MapObjectStatusTypeEnum;
}
