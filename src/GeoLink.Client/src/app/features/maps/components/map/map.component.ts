import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'esri-leaflet-renderers';
import { vectorTileLayer } from 'esri-leaflet-vector';
import { Control, Icon, latLng, Layer, LeafletMouseEvent, Map, MapOptions, Marker, tileLayer } from 'leaflet';
import { Subscription, interval, tap } from 'rxjs';

import { LoadMapAreaFilters, LoadMapObjectFilters } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapItemModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';
import Scale = Control.Scale;
import { MapsService } from '../../services/maps.service';

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
  mapObjects!: Marker<MapItemModel>[];

  markerClusterGroup!: L.MarkerClusterGroup;

  private refreshObjectsSubscription: Subscription = new Subscription();
  private getObjectsSubscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private dynamicComponentCreator: DynamicComponentCreatorHelper,
    private mapsService: MapsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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

    this.getObjectsSubscriptions.add(this.loadMapObjects());
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

  onMarkerClusterReady(group: L.MarkerClusterGroup) {
    console.warn('aaaaaaaaaa');
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

  private loadMapObjects() {
    this.mapsService.getAllObjects().subscribe(mapItems => {
      const markers: L.Marker<MapItemModel>[] = [];

      mapItems.forEach((mapItem: MapItemModel) => {
        const marker = this.createMapItemMarker(mapItem);

        markers.push(marker);
      });

      this.mapObjects = [...markers];
      this.changeDetectorRef.detectChanges();
    });
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

  private createMapItemMarker(mapItem: MapItemModel): Marker<MapItemModel> {
    const mapItemIcon = this.createMapItemIcon(mapItem);

    const marker = new Marker<MapItemModel>([mapItem.coordinates.latitude, mapItem.coordinates.longitude], {
      icon: mapItemIcon,
    });

    // TODO: We can extend the Marker object to have 'deviceData' property attached without this workaround needed - (marker as any)
    (marker as any).deviceData = JSON.stringify(mapItem);

    // Different approach to attach component as a popup - https://stackoverflow.com/a/44686112/3921353
    marker.on('click', ($event: LeafletMouseEvent) => {
      const popupComponent = this.dynamicComponentCreator.createMapItemPopup(mapItem);
      marker.unbindPopup();
      marker.bindPopup(popupComponent, {}).openPopup();
      // const htmlMarkerElement = marker.getElement();
      // htmlMarkerElement?.parentElement?.appendChild(popupComponent);
      //
      // const markerPos = DomUtil.getPosition(htmlMarkerElement!);
      // const markerClass = DomUtil.getClass(htmlMarkerElement!);
      //
      // DomUtil.setTransform(popupComponent, markerPos);
      // DomUtil.setClass(popupComponent, markerClass);
    });

    marker.on('mouseover', ($event: LeafletMouseEvent) => {
      const tooltipComponent = this.dynamicComponentCreator.createMapItemTooltip(mapItem);
      marker.unbindTooltip();
      marker
        .bindTooltip(tooltipComponent, {
          className: 'map-item-tooltip',
        })
        .openTooltip();
    });

    return marker;
  }

  private createMapItemIcon(mapItem: MapItemModel): Icon {
    return new Icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }
}
