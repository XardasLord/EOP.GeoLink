import { Control, Layer, MapOptions } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Scale = Control.Scale;

export interface MapsStateModel {
  mapOptions: MapOptions;
  mapLayersControl: LeafletControlLayersConfig;
  mapLayers: Layer[];
  markerClusterData: L.Marker[];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  mapScale: Scale;
}