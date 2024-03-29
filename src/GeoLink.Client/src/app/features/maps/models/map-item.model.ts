import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';
import { MapObjectTypeEnum } from '../../../shared/models/map-object-type.enum';
import { MapDeviceTypeEnum } from '../../../shared/models/map-device-type.enum';
import { GeoJsonObject } from 'geojson';

export interface MapClusterObjectModel {
  clusters: MapClusterModel[];
  objects: MapObjectModel[];
}

export interface MapClusterModel {
  idClust: number;
  level: number;
  objCount: number;
  pointLon: number;
  pointLat: number;
  bBoxGeom: number[];
  geom: GeoJsonObject;
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
  ppeGrp: number[];
}

export interface DeviceDetailsModel {
  idDev: number;
  devType: MapDeviceTypeEnum;
  producer: string;
  ppe: string;
  model: string;
  params: DeviceDetailsAttributeModel[];
  diagTools: DiagTool[];
  subDevId: number[];
}

export interface DeviceDetailsAttributeModel {
  idAtr: number;
  name: string;
  value: string;
  status: MapObjectStatusTypeEnum;
  isChart: boolean;
  subParams: DeviceDetailsSubParamsModel[];
  idSrc: number;
  idStatusSrc: number;
  statusDateAdd: string;
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

export interface DiagTool {
  name: string;
  link: string;
}
