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
  name: string;
  nrExpl: string;
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
