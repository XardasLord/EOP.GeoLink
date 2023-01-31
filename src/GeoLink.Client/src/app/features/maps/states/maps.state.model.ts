import { Control, Layer, MapOptions } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Scale = Control.Scale;
import { MapFiltersModel } from '../models/map-filters.model';

export interface MapsStateModel {
  markerClusterData: L.Marker[];
  mapFilters: MapFiltersModel;
}
