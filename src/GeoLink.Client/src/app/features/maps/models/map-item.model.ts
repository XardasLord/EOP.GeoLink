import { Coordinates } from './coordinates.model';

export interface MapItemModel {
  id: number;
  name: string;
  status: number;
  coordinates: Coordinates;
  groupItems: DeviceGroupModel[];
}

export interface DeviceGroupModel {
  name: string;
  deviceItems: DeviceItemModel[];
}

export interface DeviceItemModel {
  name: string;
  status: number;
  deviceItems: DeviceItemModel[];
}
