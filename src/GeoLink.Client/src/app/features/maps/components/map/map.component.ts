import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'esri-leaflet-renderers';
import { vectorTileLayer } from 'esri-leaflet-vector';
import {
  Control,
  DivIcon,
  Icon,
  latLng,
  LatLngBounds,
  Layer,
  LeafletMouseEvent,
  Map,
  MapOptions,
  Marker,
  tileLayer,
} from 'leaflet';
import { Subscription, interval, tap, switchMap, Observable } from 'rxjs';

import { LoadMapAreaFilters, LoadMapObjectFilters } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapClusterModel, MapObjectModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';
import Scale = Control.Scale;
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: L.Map;
  mapOptions!: MapOptions;
  mapLayers!: Layer[];
  mapLayersControl!: LeafletControlLayersConfig;
  mapScale!: Scale;

  private clusterMarkers: L.LayerGroup = L.layerGroup();
  private objectMarkers: L.LayerGroup = L.layerGroup();

  private lastRequestForCluster$!: Observable<any>;

  private refreshObjectsSubscription: Subscription = new Subscription();
  private getObjectsSubscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private dynamicComponentCreator: DynamicComponentCreatorHelper,
    private mapsService: MapsService
  ) {}

  ngOnInit() {
    this.mapOptions = {
      zoom: 7,
      maxZoom: 18,
      center: latLng(52.22779941887071, 19.764404296875),
      preferCanvas: true,
    };

    this.mapScale = new Scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 200,
    });

    this.store.dispatch(new LoadMapObjectFilters());
    this.store.dispatch(new LoadMapAreaFilters());

    this.refreshObjectsSubscription = interval(environment.refreshMapObjectsIntervalInMilliseconds).subscribe(_ =>
      this.getObjectsSubscriptions.add(this.loadMapObjects())
    );
  }

  ngOnDestroy(): void {
    this.refreshObjectsSubscription.unsubscribe();
    this.getObjectsSubscriptions.unsubscribe();
  }

  // onMarkerClusterReady(group: L.MarkerClusterGroup) {
  //   this.markerClusterGroup = group;
  //
  //   (this.markerClusterGroup as any).options.iconCreateFunction = (cluster: L.MarkerCluster) => {
  //     const childMarkers: Marker<MapItemModel>[] = cluster.getAllChildMarkers();
  //
  //     cluster.on('click', () => {
  //       const mapItem = MarkerClusterHelper.getMapItemModels(childMarkers);
  //       const popupComponent = this.dynamicComponentCreator.createClusterGroupPopup(mapItem);
  //
  //       cluster.unbindPopup();
  //       cluster
  //         .bindPopup(popupComponent, {
  //           className: 'cluster-group-context-menu',
  //         })
  //         .openPopup();
  //     });
  //
  //     cluster.on('contextmenu', () => {
  //       const mapItem = MarkerClusterHelper.getMapItemModels(childMarkers);
  //       const popupComponent = this.dynamicComponentCreator.createClusterGroupQuickReportsPopup(mapItem);
  //
  //       cluster.unbindPopup();
  //       cluster
  //         .bindPopup(popupComponent, {
  //           className: 'cluster-group-quick-reports-context-menu',
  //         })
  //         .openPopup();
  //     });
  //
  //     const cssName = MarkerClusterHelper.getCssClassForClusterGroup(childMarkers);
  //
  //     return new L.DivIcon({
  //       html: '<div><span>' + childMarkers.length + '</span></div>',
  //       className: cssName,
  //       iconSize: new L.Point(40, 40),
  //     });
  //   };
  //
  //   this.markerClusterGroup.refreshClusters();
  // }

  onMapReady(map: Map) {
    this.map = map;

    this.clusterMarkers.addTo(this.map);
    this.objectMarkers.addTo(this.map);

    this.getObjectsSubscriptions.add(this.loadMapObjects());

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

    this.map.on('zoomend', event => {
      this.getObjectsSubscriptions.add(this.loadMapObjects());
    });
  }

  private loadMapObjects() {
    this.clusterMarkers.clearLayers();
    this.objectMarkers.clearLayers();

    const bbox: LatLngBounds = this.map.getBounds();
    const mapZoom = this.map.getZoom();

    if (mapZoom <= 17) {
      const request$ = this.mapsService.getClustersAndObjects(
        bbox.getSouthWest().lng,
        bbox.getSouthWest().lat,
        bbox.getNorthEast().lng,
        bbox.getNorthEast().lat,
        mapZoom
      );
      this.lastRequestForCluster$ = request$;

      this.lastRequestForCluster$.pipe(switchMap(() => request$)).subscribe(response => {
        this.clusterMarkers.clearLayers();
        this.objectMarkers.clearLayers();

        response.clusters.forEach(cluster => {
          const markerCluster = this.createMapClusterMarker(cluster);

          this.clusterMarkers.addLayer(markerCluster);
        });

        response.objects?.forEach(object => {
          const markerObject = this.createMapObjectMarker(object);

          this.objectMarkers.addLayer(markerObject);
        });
      });
    } else {
      // Zoom 18 (max)
      this.mapsService
        .getObjects(bbox.getSouthWest().lng, bbox.getSouthWest().lat, bbox.getNorthEast().lng, bbox.getNorthEast().lat)
        .subscribe(objects => {
          objects?.forEach(object => {
            const markerObject = this.createMapObjectMarker(object);

            this.objectMarkers.addLayer(markerObject);
          });
        });
    }
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
        Test: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      },
    };

    this.mapLayers = [this.mapLayersControl.baseLayers['WMS Map']];
  }

  private createMapClusterMarker(cluster: MapClusterModel): Marker<MapClusterModel> {
    const clusterIcon = this.createMapClusterIcon(cluster);

    const marker = new Marker<MapClusterModel>([cluster.pointLat, cluster.pointLon], {
      icon: clusterIcon,
    });

    marker.on('click', ($event: LeafletMouseEvent) => {
      const popupComponent = this.dynamicComponentCreator.createClusterGroupPopup(cluster.objectGroups);

      marker.unbindPopup();
      marker
        .bindPopup(popupComponent, {
          className: 'cluster-group-context-menu',
        })
        .openPopup();
    });

    // marker.on('mouseover', ($event: LeafletMouseEvent) => {
    //   const tooltipComponent = this.dynamicComponentCreator.createMapItemTooltip(mapItem);
    //   marker.unbindTooltip();
    //   marker
    //     .bindTooltip(tooltipComponent, {
    //       className: 'map-item-tooltip',
    //     })
    //     .openTooltip();
    // });

    return marker;
  }

  private createMapObjectMarker(mapObject: MapObjectModel): Marker<MapObjectModel> {
    const mapObjectIcon = this.createMapObjectIcon(mapObject);

    const marker = new Marker<MapObjectModel>([mapObject.lat, mapObject.lon], {
      icon: mapObjectIcon,
    });

    // Different approach to attach component as a popup - https://stackoverflow.com/a/44686112/3921353
    marker.on('click', ($event: LeafletMouseEvent) => {
      const popupComponent = this.dynamicComponentCreator.createMapItemPopup(mapObject);
      marker.unbindPopup();
      marker.bindPopup(popupComponent, {}).openPopup();
    });

    marker.on('mouseover', ($event: LeafletMouseEvent) => {
      const tooltipComponent = this.dynamicComponentCreator.createMapItemTooltip(mapObject);
      marker.unbindTooltip();
      marker
        .bindTooltip(tooltipComponent, {
          className: 'map-item-tooltip',
        })
        .openTooltip();
    });

    return marker;
  }

  private createMapClusterIcon(cluster: MapClusterModel): DivIcon {
    const cssName = MarkerClusterHelper.getCssClassForClusterGroup(cluster);

    return new DivIcon({
      html: '<div><span>' + cluster.objCount + '</span></div>',
      className: cssName,
      iconSize: new L.Point(40, 40),
    });
  }

  private createMapObjectIcon(mapItem: MapObjectModel): Icon {
    return new Icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }
}
