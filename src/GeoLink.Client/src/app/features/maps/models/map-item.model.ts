import { Coordinates } from './coordinates.model';
import { DeviceStatusEnum } from './device-status.enum';

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
  objType: number;
  idStatus: number;
  region: number;
  devices: DeviceModel[];
}

export interface MapObjectGroupModel {
  objType: number;
  objCount: number;
  devStat: DeviceStatisticsModel[];
}

export interface DeviceStatisticsModel {
  idStat: number;
  stCount: number;
}

export interface DeviceModel {
  idDev: number;
  devType: number;
  producer: string;
  model: string;
  idStatus: number;
}

export interface MapItemModel {
  id: number;
  name: string;
  status: DeviceStatusEnum;
  coordinates: Coordinates;
  groupItems: DeviceGroupModel[];
}

export interface DeviceGroupModel {
  name: string;
  deviceItems: DeviceItemModel[];
}

export interface DeviceItemModel {
  name: string;
  status: DeviceStatusEnum;
  deviceItems: DeviceItemModel[];
}
