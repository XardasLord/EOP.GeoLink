import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { Subscription, interval } from 'rxjs';
import { MapsState } from '../../states/maps.state';

import { LoadMapAreaFilters, LoadMapBackground, LoadMapObjectFilters, LoadMapObjects } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  mapOptions$ = this.store.select(MapsState.getMapOptions);
  mapControlLayers$ = this.store.select(MapsState.getMapControlLayers);
  mapLayersAsync$ = this.store.select(MapsState.getMapLayers);
  markerClusterOptions$ = this.store.select(MapsState.getMarkerClusterOptions);
  mapObjects$ = this.store.select(MapsState.getMapObjects);

  markerClusterGroup!: L.MarkerClusterGroup;

  private refreshObjectsSubscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadMapBackground());
    this.store.dispatch(new LoadMapObjects());
    this.store.dispatch(new LoadMapObjectFilters());
    this.store.dispatch(new LoadMapAreaFilters());

    this.refreshObjectsSubscription = interval(environment.refreshMapObjectsIntervalInMilliseconds).subscribe(_ =>
      this.store.dispatch(new LoadMapObjects())
    );
  }

  ngOnDestroy(): void {
    this.refreshObjectsSubscription.unsubscribe();
  }

  onMarkerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  onMapReady(map: Map) {
    map.addControl(this.store.selectSnapshot(MapsState.getMapScale));

    // https://github.com/Igor-Vladyka/leaflet.browser.print
    L.control
      .browserPrint({
        title: 'Drukuj',
        printModesNames: {
          Portrait: 'Pionowo',
          Landscape: 'Poziomo',
          Auto: 'Auto',
          Custom: 'Wybierz obszar',
        },
      })
      .addTo(map);
  }
}
