import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as L from 'leaflet';
import { MapsState } from '../../states/maps.state';
import { LoadMapBackground, LoadMapObjects } from '../../states/maps.action';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapOptions$ = this.store.select(MapsState.getMapOptions);
  mapControlLayers$ = this.store.select(MapsState.getMapControlLayers);
  mapLayersAsync$ = this.store.select(MapsState.getMapLayers);
  markerClusterOptions$ = this.store.select(MapsState.getMarkerClusterOptions);
  mapObjects$ = this.store.select(MapsState.getMapObjects);

  markerClusterGroup!: L.MarkerClusterGroup;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadMapBackground());
    this.store.dispatch(new LoadMapObjects());
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }
}
