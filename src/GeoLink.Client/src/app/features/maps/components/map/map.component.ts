import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import { Control, latLng, Layer, Map, MapOptions, Marker, tileLayer } from 'leaflet';
import { Subscription, interval } from 'rxjs';
import { MapsState } from '../../states/maps.state';

import { LoadMapAreaFilters, LoadMapObjectFilters, LoadMapObjects } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapItemModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';
import Scale = Control.Scale;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  mapOptions!: MapOptions;
  mapLayers!: Layer[];
  markerClusterOptions!: L.MarkerClusterGroupOptions;
  mapScale!: Scale;
  mapObjects$ = this.store.select(MapsState.getMapObjects);

  markerClusterGroup!: L.MarkerClusterGroup;

  private refreshObjectsSubscription: Subscription = new Subscription();

  constructor(private store: Store, private dynamicComponentCreator: DynamicComponentCreatorHelper) {}

  ngOnInit() {
    this.mapOptions = {
      zoom: 7,
      maxZoom: 14,
      center: latLng(52.22779941887071, 19.764404296875),
      preferCanvas: true,
    };

    this.markerClusterOptions = {
      maxClusterRadius: 200,
      zoomToBoundsOnClick: false,
      removeOutsideVisibleBounds: true,
      // chunkedLoading: true,
      // chunkProgress: function (processed, total, elapsed) {
      //   const progress = document.getElementById('progress')!;
      //   const progressBar = document.getElementById('progress-bar')!;
      //
      //   if (elapsed > 1000) {
      //     // if it takes more than a second to load, display the progress bar:
      //     progress.style.display = 'block';
      //     progressBar.style.width = Math.round((processed / total) * 100) + '%';
      //   }
      //
      //   if (processed === total) {
      //     // all markers processed - hide the progress bar:
      //     progress.style.display = 'none';
      //   }
      // },
    };

    this.mapScale = new Scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 200,
    });

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

      cluster.on('contextmenu', () => {
        const mapItem = MarkerClusterHelper.getMapItemModels(childMarkers);
        const popupComponent = this.dynamicComponentCreator.createClusterGroupQuickReportsPopup(mapItem);

        cluster.unbindPopup();
        cluster
          .bindPopup(popupComponent, {
            className: 'cluster-group-quick-reports-context-menu',
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
    if (environment.arcGisMapBackground.length > 0) {
      this.loadLayersFromArcGIS(map);
    } else if (environment.wmsMapBackground.length > 0) {
      this.loadLayersFromWMS();
    }

    map.addControl(this.mapScale);

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

  private loadLayersFromArcGIS(map: Map) {
    // ArcGIS Vector Tile Server

    const basemapLayers = {
      Streets: esri.basemapLayer('Streets').addTo(map),
      Topographic: esri.basemapLayer('Topographic'),
      Terrain: esri.basemapLayer('Terrain'),
      Gray: esri.basemapLayer('Gray'),
      Imagery: esri.basemapLayer('Imagery'),
    };

    L.control.layers(basemapLayers, undefined, { collapsed: false }).addTo(map);

    // esri
    //   .tiledMapLayer({
    //     url: environment.arcGisMapBackground,
    //   })
    //   .addTo(map);
  }

  private loadLayersFromWMS() {
    this.mapLayers = [
      // https://leafletjs.com/examples/wms/wms.html
      // http://ows.mundialis.de/services/service?
      tileLayer.wms(environment.wmsMapBackground, {
        layers: environment.wmsBaseLayerName,
        opacity: 0.8,
        minZoom: 6,
        maxZoom: 19,
        detectRetina: true,
        format: 'image/png',
      }),
    ];
  }
}
