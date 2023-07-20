import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';

export interface ReportModel {
  objId: number;
  objType: string;
  ipAddress: string;
  objNr: number;
  objName: string;
  objRegion: string;
  objStatus: MapObjectStatusTypeEnum;
  availability: string;
  devId: number;
  devNr: string;
  devType: string;
  devStatus: MapObjectStatusTypeEnum;
  actions: ReportActionModel;
}

export interface ReportActionModel {
  mapLon: number;
  mapLat: number;
  chartIdDev: number;
}
