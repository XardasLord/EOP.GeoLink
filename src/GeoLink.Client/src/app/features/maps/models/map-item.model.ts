import { Coordinates } from './coordinates.model';
import { DeviceStatusEnum } from './device-status.enum';

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
