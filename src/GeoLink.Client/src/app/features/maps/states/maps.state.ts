import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { circle, latLng, Layer, MapOptions, marker, polygon, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { MapsStateModel } from './maps.state.model';
import { LoadMapBackground, LoadMapObjects } from './maps.action';

const MAPS_STATE_TOKEN = new StateToken<MapsStateModel>('maps');

@State<MapsStateModel>({
  name: MAPS_STATE_TOKEN,
  defaults: {
    mapOptions: {},
    mapLayersControl: {
      baseLayers: {},
      overlays: {},
    },
    mapLayers: [],
    markerClusterData: [],
    markerClusterOptions: {},
  },
})
@Injectable()
export class MapsState {
  @Selector([MAPS_STATE_TOKEN])
  static getMapOptions(state: MapsStateModel): MapOptions {
    return state.mapOptions;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMapControlLayers(state: MapsStateModel): LeafletControlLayersConfig {
    return state.mapLayersControl;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMapLayers(state: MapsStateModel): Layer[] {
    return state.mapLayers;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMarkerClusterOptions(state: MapsStateModel): L.MarkerClusterGroupOptions {
    return state.markerClusterOptions;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMapObjects(state: MapsStateModel): L.Marker[] {
    return state.markerClusterData;
  }

  @Action(LoadMapBackground)
  loadMapBackground(ctx: StateContext<MapsStateModel>, _: LoadMapBackground) {
    ctx.patchState({
      mapOptions: {
        zoom: 7,
        center: latLng(52.22779941887071, 19.764404296875),
      },
      mapLayersControl: {
        baseLayers: {
          Topography: tileLayer.wms('http://ows.mundialis.de/services/service?', {
            layers: 'TOPO-WMS',
            maxZoom: 18,
            attribution: '...',
          }),
          Places: tileLayer.wms('http://ows.mundialis.de/services/service?', {
            layers: 'OSM-Overlay-WMS',
            maxZoom: 18,
            attribution: '...',
          }),
          'Topography, then places': tileLayer.wms('http://ows.mundialis.de/services/service?', {
            layers: 'TOPO-WMS,OSM-Overlay-WMS',
            maxZoom: 18,
            attribution: '...',
          }),
          'Places, then topography': tileLayer.wms('http://ows.mundialis.de/services/service?', {
            layers: 'OSM-Overlay-WMS,TOPO-WMS',
            maxZoom: 18,
            attribution: '...',
          }),
        },
        overlays: {
          'Big Circle': circle([46.95, -122], { radius: 5000 }),
          'Big Square': polygon([
            [46.8, -121.55],
            [46.9, -121.55],
            [46.9, -121.7],
            [46.8, -121.7],
          ]),
        },
      },
      mapLayers: [
        // https://leafletjs.com/examples/wms/wms.html
        tileLayer.wms('http://ows.mundialis.de/services/service?', {
          layers: 'TOPO-WMS,OSM-Overlay-WMS',
          opacity: 0.7,
          minZoom: 3,
          maxZoom: 19,
          detectRetina: true,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
        circle([46.95, -122], { radius: 5000 }),
        polygon([
          [46.8, -121.85],
          [46.92, -121.92],
          [46.87, -121.8],
        ]),
        marker([52.22779941887071, 19.764404296875], {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/leaflet/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
            shadowUrl: 'assets/leaflet/marker-shadow.png',
          }),
        }),
      ],
    });
  }

  @Action(LoadMapObjects)
  loadMapObjects(ctx: StateContext<MapsStateModel>, _: LoadMapObjects) {
    const markers: L.Marker[] = [];

    for (let i = 0; i < 1000; i++) {
      const icon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/marker-icon.png',
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
      });

      markers.push(L.marker([this.generateLat(), this.generateLon()], { icon }));
    }

    ctx.patchState({
      markerClusterOptions: {},
      markerClusterData: [...markers],
    });
  }

  // Generators for lat/lon values
  private generateLat() {
    return Math.random() * 360 - 180;
  }
  private generateLon() {
    return Math.random() * 180 - 90;
  }
}
