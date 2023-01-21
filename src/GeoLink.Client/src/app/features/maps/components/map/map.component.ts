import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as L from 'leaflet';
import { Map, Marker } from 'leaflet';
import { Subscription, interval } from 'rxjs';
import { MapsState } from '../../states/maps.state';

import { LoadMapAreaFilters, LoadMapBackground, LoadMapObjectFilters, LoadMapObjects } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapItemModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';

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

  constructor(private store: Store, private dynamicComponentCreator: DynamicComponentCreatorHelper) {}

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

    (this.markerClusterGroup as any).options.iconCreateFunction = (cluster: L.MarkerCluster) => {
      const childMarkers: Marker<MapItemModel>[] = cluster.getAllChildMarkers();

      cluster.on('click', () => {
        const mapItem = MarkerClusterHelper.getMapItemModels(childMarkers);
        const popupComponent = this.dynamicComponentCreator.createClusterGroupPopup(mapItem);

        cluster.unbindPopup();
        cluster
          .bindPopup(popupComponent, {
            className: 'cluster-group-context-menu',
          })
          .openPopup();
      });

      const cssName = MarkerClusterHelper.getCssClassForClusterGroup(childMarkers);

      return new L.DivIcon({
        html: '<div><span>' + childMarkers.length + '</span></div>',
        className: cssName,
        iconSize: new L.Point(40, 40),
      });
    };

    this.markerClusterGroup.refreshClusters();
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
