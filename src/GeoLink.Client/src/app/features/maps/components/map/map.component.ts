import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'esri-leaflet-renderers';
import { vectorTileLayer } from 'esri-leaflet-vector';
import * as lvtl from 'leaflet-vector-tile-layer';
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
  mapLayersControl!: LeafletControlLayersConfig;
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
    // if (environment.arcGisMapBackground.length > 0) {
    //   this.loadLayersFromArcGIS(map);
    // } else if (environment.wmsMapBackground.length > 0) {
    //   this.loadLayersFromWMS();
    // }

    this.test();

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

  private test() {
    this.mapLayersControl = {
      baseLayers: {
        OpenInfraMap: lvtl.default('https://openinframap.org/tiles/{z}/{x}/{y}.pbf', {
          style: {},
        }),
      },
      overlays: {},
    };

    this.mapLayers = [this.mapLayersControl.baseLayers['OpenInfraMap']];
  }

  private loadLayersFromArcGIS(map: Map) {
    // ArcGIS Vector Tile Server
    const objectIdField = 'OBJECTID';

    this.mapLayersControl = {
      baseLayers: {
        'ArcGIS VectorTileServer Map': vectorTileLayer(environment.arcGisMapBackground, {}),
      },
      overlays: {
        'Stacja SN/nN': esri.featureLayer({
          url: environment.arcGisMapLayer0,
          fields: [objectIdField],
          minZoom: 14,
        }),
        'Odcinek WN': esri.featureLayer({
          url: environment.arcGisMapLayer1,
          fields: [objectIdField],
        }),
        'Odcinek nN': esri.featureLayer({
          url: environment.arcGisMapLayer2,
          fields: [objectIdField],
        }),
        'Odcinek SN': esri.featureLayer({
          url: environment.arcGisMapLayer3,
          fields: [objectIdField],
        }),
        GPZ: esri.featureLayer({
          url: environment.arcGisMapLayer4,
          fields: [objectIdField],
        }),
      },
    };

    this.mapLayers = [this.mapLayersControl.baseLayers['ArcGIS VectorTileServer Map']];
  }

  private loadLayersFromWMS() {
    this.mapLayersControl = {
      baseLayers: {
        'WMS Map': tileLayer.wms(environment.wmsMapBackground, {
          layers: environment.wmsBaseLayerName,
          opacity: 0.8,
          minZoom: 6,
          maxZoom: 19,
          detectRetina: true,
          format: 'image/png',
        }),
      },
      overlays: {
        'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      },
    };

    this.mapLayers = [this.mapLayersControl.baseLayers['WMS Map']];
  }
}
