import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'esri-leaflet-renderers';
import { vectorTileLayer } from 'esri-leaflet-vector';
import { Control, Icon, LatLng, latLng, Layer, LeafletMouseEvent, Map, MapOptions, Marker, tileLayer } from 'leaflet';
import { Subscription, interval, tap } from 'rxjs';

import { LoadMapAreaFilters, LoadMapObjectFilters } from '../../states/maps.action';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapItemModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';
import Scale = Control.Scale;
import { MapsService } from '../../services/maps.service';
import * as Supercluster from 'supercluster';
import { ClusterFeature } from 'supercluster';
import * as GeoJSON from 'geojson';

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

  markers: L.Marker<MapItemModel>[] = [];
  superclusterIndex!: Supercluster;

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
    };

    this.mapScale = new Scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 200,
    });

    this.store.dispatch(new LoadMapObjectFilters());
    this.store.dispatch(new LoadMapAreaFilters());

    // this.refreshObjectsSubscription = interval(environment.refreshMapObjectsIntervalInMilliseconds).subscribe(_ =>
    //   this.getObjectsSubscriptions.add(this.loadMapObjects())
    // );
  }

  ngOnDestroy(): void {
    this.refreshObjectsSubscription.unsubscribe();
    this.getObjectsSubscriptions.unsubscribe();
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
    this.getObjectsSubscriptions.add(this.loadMapObjects(map));

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

    // map.on('moveend', ($event: any) => {
    //   const superClusterComponents = this.markers.map(mapItemModel => {
    //     const lng = mapItemModel.getLatLng().lng;
    //     const lat = mapItemModel.getLatLng().lat;
    //
    //     return {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'Point',
    //         coordinates: [lng, lat],
    //       },
    //       properties: {},
    //     };
    //   });
    //
    //   const superClusterMarkers = L.geoJson(undefined, {
    //     pointToLayer: (feature, latlng) => this.createMapItemIconForSupercluster(feature, latlng),
    //   }).addTo(map);
    //
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   const Supercluster = require('supercluster');
    //
    //   const index = new Supercluster.default({
    //     radius: 200,
    //     extent: 256,
    //     maxZoom: 17,
    //   }).load(superClusterComponents);
    //
    //   const bounds = map.getBounds();
    //   const bbox: GeoJSON.BBox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
    //   const zoom = map.getZoom();
    //
    //   const clusters = index.getClusters(bbox, zoom);
    //   console.log(clusters);
    //
    //   superClusterMarkers.clearLayers();
    //   superClusterMarkers.addData(clusters as any);
    // });
  }

  private loadMapObjects(map: Map) {
    this.mapsService.getAllObjects().subscribe(mapItems => {
      // const markers: L.Marker<MapItemModel>[] = [];

      mapItems.forEach((mapItem: MapItemModel) => {
        const marker = this.createMapItemMarker(mapItem);

        this.markers.push(marker);
      });

      // this.mapObjects = [...markers];
      // this.changeDetectorRef.detectChanges();

      // SUPERCLUSTER part
      const superClusterComponents = this.markers.map(mapItemModel => {
        const lng = mapItemModel.getLatLng().lng;
        const lat = mapItemModel.getLatLng().lat;

        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          properties: {
            cluster: false,
            deviceData: (mapItemModel as any).deviceData,
          },
        };
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const Supercluster = require('supercluster');
      this.superclusterIndex = new Supercluster.default({
        radius: 200,
        extent: 256,
        maxZoom: 17,
      });
      const superClusterMarkers = L.geoJson(undefined, {
        pointToLayer: (feature, latlng) =>
          this.createMapItemIconForSupercluster(feature, latlng, this.superclusterIndex),
      }).addTo(map);

      this.superclusterIndex.load(superClusterComponents as any); // TODO: Typings

      const bounds = map.getBounds();
      const bbox: GeoJSON.BBox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
      const zoom = map.getZoom();
      console.log('initial bbox: ', bbox);

      const clusters: ClusterFeature<any>[] = this.superclusterIndex.getClusters(bbox, zoom);
      console.log(clusters);
      // clusters.forEach((clus: any) => {
      //   clus.on('click', () => {
      //     const childMarkers = superclusterRef.getLeaves(clus.id, 1000000);
      //     const mapItem = MarkerClusterHelper.getMapItemModels(childMarkers);
      //     const popupComponent = this.dynamicComponentCreator.createClusterGroupPopup(mapItem);
      //
      //     clus.unbindPopup();
      //     clus
      //       .bindPopup(popupComponent, {
      //         className: 'cluster-group-context-menu',
      //       })
      //       .openPopup();
      //   });
      // });

      superClusterMarkers.clearLayers();
      superClusterMarkers.addData(clusters as any);

      // TODO: Event kliknięcia na mapę
      map.on('click', (event: LeafletMouseEvent) => {
        // const latlng = event.latlng;
        // const point = [latlng.lng, latlng.lat];
        //
        // const zoom = map.getZoom();
        // const bbox = this.superclusterIndex.getClusterExpansionZoom(0, zoom);
        // const clusters = this.superclusterIndex.getClusters(bbox, zoom, point);

        const currentZoomLevel = map.getZoom();
        const bbox: GeoJSON.BBox = [
          event.latlng.lng - 1 / 2,
          event.latlng.lat - 1 / 2,
          event.latlng.lng + 1 / 2,
          event.latlng.lat + 1 / 2,
        ];

        const clusters: ClusterFeature<any>[] = this.superclusterIndex.getClusters(bbox, currentZoomLevel);
        console.warn(clusters);
        // jeśli w pobliżu kliknięcia jest tylko jeden punkt, to wykonaj jakąś akcję
        if (clusters.length === 1 && !clusters[0].properties.cluster) {
          // tutaj można zrobić coś z pojedynczym punktem
          console.log('Clicked on single point:', clusters[0]);
        } else if (clusters[0]) {
          // w przeciwnym razie wykonaj jakąś inną akcję, np. powiększ mapę do klikniętego klastra
          console.log('Clicked on cluster:', clusters[0]);
          map.flyTo(event.latlng, currentZoomLevel + 1, {});
        } else {
          console.warn('Clicked not on a cluster or marker, just a map');
        }
      });

      // this.changeDetectorRef.detectChanges();
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
    const mapItemIcon = this.createMapItemIcon();

    const marker = new Marker<MapItemModel>([mapItem.coordinates.latitude, mapItem.coordinates.longitude], {
      icon: mapItemIcon.getIcon(),
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

  public createMapItemIconForSupercluster(feature: any, latlng: LatLng, supercluster: Supercluster): Marker {
    const count = feature.properties.point_count;
    const childMarkers = (supercluster as Supercluster).getLeaves(feature.properties.cluster_id, 100000000);

    const cssName = MarkerClusterHelper.getCssClassForSuperclusterGroup(childMarkers);

    const icon = new L.DivIcon({
      html: '<div><span>' + count + '</span></div>',
      className: cssName,
      iconSize: new L.Point(40, 40),
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    return new L.Marker(latlng, { icon });
  }

  public createMapItemIcon(): Marker {
    const icon = new L.DivIcon({
      html: '<div><span>3</span></div>',
      className: 'marker-cluster-base marker-cluster-good-100',
      iconSize: new L.Point(40, 40),
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    return new L.Marker(new LatLng(0, 0), { icon });

    // return new Icon({
    //   iconSize: [25, 41],
    //   iconAnchor: [13, 41],
    //   iconUrl: 'assets/leaflet/marker-icon.png',
    //   iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    //   shadowUrl: 'assets/leaflet/marker-shadow.png',
    // });
  }
}
