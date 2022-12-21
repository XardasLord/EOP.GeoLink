import { Coordinates } from './coordinates.model';

export interface MapItemModel {
  id: number;
  name: string;
  status: number;
  coordinates: Coordinates;
}
