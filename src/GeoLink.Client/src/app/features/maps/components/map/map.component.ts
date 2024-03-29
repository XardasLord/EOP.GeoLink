import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import {
  Control,
  DivIcon,
  GeoJSON,
  Icon,
  LatLng,
  latLng,
  LatLngBounds,
  Layer,
  LayerGroup,
  LeafletEventHandlerFn,
  LeafletMouseEvent,
  Map,
  MapOptions,
  Marker,
  Point,
  Polygon,
  tileLayer,
} from 'leaflet';
import * as esri from 'esri-leaflet';
import 'esri-leaflet-renderers';
import 'leaflet-contextmenu';
import { vectorTileLayer } from 'esri-leaflet-vector';
import { interval, Subscription, throttleTime } from 'rxjs';

import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import { environment } from '../../../../../environments/environment';
import { MarkerClusterHelper } from '../../helpers/marker-cluster.helper';
import { MapClusterModel, MapObjectModel } from '../../models/map-item.model';
import { DynamicComponentCreatorHelper } from '../../helpers/dynamic-component-creator.helper';
import { MapsService } from '../../services/maps.service';
import { GeoJsonObject } from 'geojson';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { MapObjectTypeEnum } from '../../../../shared/models/map-object-type.enum';
import Scale = Control.Scale;
import { ActivatedRoute } from '@angular/router';
import { FiltersState } from '../../../../shared/states/filters.state';
import { MapFilterModel } from '../../models/map-filter-model';
import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: Map;
  mapOptions!: MapOptions | any;
  mapLayers!: Layer[];
  mapLayersControl!: LeafletControlLayersConfig;
  mapScale!: Scale;

  public loading: boolean = false;

  private clusterMarkers: LayerGroup = new LayerGroup();
  private objectMarkers: LayerGroup = new LayerGroup();

  private lastRequestForCluster$!: Subscription;
  private lastRequestForObjects$!: Subscription;

  private refreshObjectsSubscription: Subscription = new Subscription();
  private getObjectsSubscriptions: Subscription = new Subscription();

  private mapMoveEndAndZoomEndEventHandler!: LeafletEventHandlerFn;

  constructor(
    private store: Store,
    private dynamicComponentCreator: DynamicComponentCreatorHelper,
    private changeDetectorRef: ChangeDetectorRef,
    private mapsService: MapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mapOptions = {
      zoom: 7,
      maxZoom: 25,
      center: latLng(52.22779941887071, 19.764404296875),
      preferCanvas: true,
      zoomControl: false,
      contextmenu: true,
      contextmenuWidth: 160,
      contextmenuItems: [
        {
          text: 'Skopiuj współrzędne',
          callback: (event: LeafletMouseEvent) => {
            this.copyToClipboard(`${event.latlng.lat},${event.latlng.lng}`);
          },
        },
      ],
    };

    this.refreshObjectsSubscription = interval(environment.refreshMapObjectsIntervalInMilliseconds).subscribe(() =>
      this.getObjectsSubscriptions.add(this.loadMapObjects())
    );

    this.mapMoveEndAndZoomEndEventHandler = () => {
      this.getObjectsSubscriptions.add(this.loadMapObjects());
    };
  }

  ngOnDestroy(): void {
    this.refreshObjectsSubscription.unsubscribe();
    this.getObjectsSubscriptions.unsubscribe();
    this.unregisterMapEvents();
  }

  onMapReady(map: Map) {
    this.map = map;

    this.clusterMarkers.addTo(this.map);
    this.objectMarkers.addTo(this.map);

    setTimeout(() => {
      this.getObjectsSubscriptions.add(this.loadMapObjects());
    }, 1000);

    if (environment.arcGisMapBackground.length > 0) {
      this.loadLayersFromArcGIS();
    } else if (environment.wmsMapBackground.length > 0) {
      this.loadLayersFromWMS();
    }

    if (this.route.snapshot.queryParams['lat'] && this.route.snapshot.queryParams['lon']) {
      this.map.flyTo(new LatLng(this.route.snapshot.queryParams['lat'], this.route.snapshot.queryParams['lon']), 18, {
        animate: true,
        duration: 0.5,
      });
    } else {
      this.map.invalidateSize();
    }

    this.mapScale = new Scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 200,
    });

    this.map.addControl(this.mapScale);

    L.control.zoom({ position: 'topright' }).addTo(this.map);

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
        position: 'topright',
      })
      .addTo(this.map);

    this.registerMapEvents();
  }

  private copyToClipboard(textToCopy: string) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {})
        .catch(err => {
          console.error(`Błąd podczas kopiowania do schowka: ${err}`);
        });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);

      textarea.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        console.error(`Błąd podczas kopiowania do schowka: ${err}`);
      } finally {
        // Usuwamy tymczasowy element textarea
        document.body.removeChild(textarea);
      }
    }
  }

  private registerMapEvents() {
    this.map.on('moveend', this.mapMoveEndAndZoomEndEventHandler);
    this.map.on('zoomend', this.mapMoveEndAndZoomEndEventHandler);
  }

  private unregisterMapEvents() {
    this.map.off('moveend', this.mapMoveEndAndZoomEndEventHandler);
    this.map.off('zoomend', this.mapMoveEndAndZoomEndEventHandler);
  }

  private loadMapObjects() {
    const bbox: LatLngBounds = this.map.getBounds();
    const mapZoom = this.map.getZoom();
    const selectedObjectMapFilters = this.store.selectSnapshot(FiltersState.getSelectedObjectMapFilters);
    const selectedDeviceMapFilters = this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters);
    const selectedRegionMapFilters = this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters);
    const selectedStatusMapFilters = this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters);
    const selectedAttributeFilters = this.store.selectSnapshot(FiltersState.getFilterAttributeModels);

    // TODO: Loading move to state?
    this.loading = true;
    this.changeDetectorRef.detectChanges();

    if (mapZoom <= 17) {
      this.handleClusterRequest(
        bbox,
        mapZoom,
        selectedObjectMapFilters,
        selectedDeviceMapFilters,
        selectedRegionMapFilters,
        selectedStatusMapFilters,
        selectedAttributeFilters
      );
    } else {
      this.handleObjectsRequest(
        bbox,
        selectedObjectMapFilters,
        selectedDeviceMapFilters,
        selectedRegionMapFilters,
        selectedStatusMapFilters,
        selectedAttributeFilters
      );
    }
  }

  private handleClusterRequest(
    bbox: LatLngBounds,
    mapZoom: number,
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedAttributeFilters: FilterAttributeModel[]
  ) {
    if (this.lastRequestForCluster$) {
      this.lastRequestForCluster$.unsubscribe();
    }

    const request$ = this.mapsService.getClustersAndObjects(
      bbox.getSouthWest().lng,
      bbox.getSouthWest().lat,
      bbox.getNorthEast().lng,
      bbox.getNorthEast().lat,
      mapZoom,
      selectedObjectMapFilters,
      selectedDeviceMapFilters,
      selectedRegionMapFilters,
      selectedStatusMapFilters,
      selectedAttributeFilters
    );

    this.lastRequestForCluster$ = request$.pipe(throttleTime(200)).subscribe(response => {
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

      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });

    this.getObjectsSubscriptions.add(this.lastRequestForCluster$);
  }

  private handleObjectsRequest(
    bbox: LatLngBounds,
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedAttributeFilters: FilterAttributeModel[]
  ) {
    if (this.lastRequestForCluster$) {
      this.lastRequestForCluster$.unsubscribe();
    }

    const request$ = this.mapsService.getObjects(
      bbox.getSouthWest().lng,
      bbox.getSouthWest().lat,
      bbox.getNorthEast().lng,
      bbox.getNorthEast().lat,
      selectedObjectMapFilters,
      selectedDeviceMapFilters,
      selectedRegionMapFilters,
      selectedStatusMapFilters,
      selectedAttributeFilters
    );

    this.lastRequestForObjects$ = request$.subscribe(objects => {
      this.clusterMarkers.clearLayers();
      this.objectMarkers.clearLayers();

      objects?.forEach(object => {
        const markerObject = this.createMapObjectMarker(object);

        this.objectMarkers.addLayer(markerObject);
      });

      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });

    this.getObjectsSubscriptions.add(this.lastRequestForObjects$);
  }

  private loadLayersFromArcGIS() {
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
        'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 25,
          attribution: '...',
        }),
        // 'WMS Map': tileLayer.wms(environment.wmsMapBackground, {
        //   layers: environment.wmsBaseLayerName,
        //   opacity: 0.8,
        //   minZoom: 6,
        //   maxZoom: 20,
        //   detectRetina: true,
        //   format: 'image/png',
        // }),
      },
      overlays: {
        'Uzbrojenie terenu - gesut': tileLayer.wms(
          'https://integracja02.gugik.gov.pl/cgi-bin/KrajowaIntegracjaUzbrojeniaTerenu_14?',
          {
            layers: 'gesut',
            opacity: 0.8,
            minZoom: 6,
            maxZoom: 25,
            format: 'image/png',
          }
        ),
        'Uzbrojenie terenu - kgesut': tileLayer.wms(
          'https://integracja02.gugik.gov.pl/cgi-bin/KrajowaIntegracjaUzbrojeniaTerenu_14?',
          {
            layers: 'kgesut',
            opacity: 0.8,
            minZoom: 6,
            maxZoom: 25,
            format: 'image/png',
          }
        ),
      },
    };

    this.mapLayers = [this.mapLayersControl.baseLayers['Open Street Map']];
  }

  private createMapClusterMarker(cluster: MapClusterModel): Marker<MapClusterModel> {
    const clusterIcon = this.createMapClusterIcon(cluster);

    const clusterMarker = new Marker<MapClusterModel>([cluster.pointLat, cluster.pointLon], {
      icon: clusterIcon,
    });

    clusterMarker.on('click', () => {
      this.unregisterMapEvents();

      const markerLatLng = clusterMarker.getLatLng();

      // We move the point to flyTo to move 100px down
      const latLngToFlyTo = this.map.layerPointToLatLng(this.map.latLngToLayerPoint(markerLatLng).add([0, 100]));

      this.map.flyTo(latLngToFlyTo, this.map.getZoom());

      const popupComponent = this.dynamicComponentCreator.createClusterGroupPopup(
        cluster.idClust,
        cluster.level,
        cluster.objectGroups
      );

      clusterMarker.unbindPopup();
      clusterMarker
        .bindPopup(popupComponent, {
          className: 'cluster-group-context-menu',
          closeButton: true,
          closeOnClick: false,
        })
        .openPopup();

      // This is to prevent from loading map objects while map's flying to the marker
      setTimeout(() => {
        this.registerMapEvents();
      }, 1000);
    });

    clusterMarker.on('contextmenu', () => {
      const popupComponent = this.dynamicComponentCreator.createClusterGroupQuickReportsPopup(cluster);

      clusterMarker.unbindPopup();
      clusterMarker
        .bindPopup(popupComponent, {
          className: 'cluster-group-quick-reports-context-menu',
        })
        .openPopup();
    });

    // let clusterBboxPolygon: Polygon;
    let clusterGeoJsonPolygon: GeoJSON;

    clusterMarker.on('mouseover', () => {
      // clusterBboxPolygon = this.getClusterAreaPolygon(cluster.bBoxGeom);
      // clusterBboxPolygon.addTo(this.map);

      clusterGeoJsonPolygon = this.getClusterAreaGeoJsonPolygon(cluster.geom);
      clusterGeoJsonPolygon.addTo(this.map);
    });

    clusterMarker.on('mouseout', () => {
      // this.map.removeLayer(clusterBboxPolygon);
      this.map.removeLayer(clusterGeoJsonPolygon);
    });

    clusterMarker.on('remove', () => {
      // if (clusterBboxPolygon) this.map.removeLayer(clusterBboxPolygon);
      if (clusterGeoJsonPolygon) this.map.removeLayer(clusterGeoJsonPolygon);
    });

    return clusterMarker;
  }

  private createMapObjectMarker(mapObject: MapObjectModel): Marker<MapObjectModel> {
    const mapObjectIcon = this.createMapObjectIcon(mapObject);

    const marker = new Marker<MapObjectModel>([mapObject.lat, mapObject.lon], {
      icon: mapObjectIcon,
    });

    // Different approach to attach component as a popup - https://stackoverflow.com/a/44686112/3921353
    marker.on('click', () => {
      this.unregisterMapEvents();

      const markerLatLng = marker.getLatLng();

      // We move the point to flyTo to move 30px down
      const latLngToFlyTo = this.map.layerPointToLatLng(this.map.latLngToLayerPoint(markerLatLng).add([0, 30]));

      this.map.flyTo(latLngToFlyTo, this.map.getZoom());

      const popupComponent = this.dynamicComponentCreator.createMapItemPopup(mapObject);
      marker.unbindPopup();
      marker
        .bindPopup(popupComponent, {
          className: 'map-object-context-menu',
          closeButton: true,
          closeOnClick: false,
        })
        .openPopup();

      // This is to prevent from loading map objects while map's flying to the marker
      setTimeout(() => {
        this.registerMapEvents();
      }, 1000);
    });

    if (environment.markerTooltipEnabled) {
      marker.on('mouseover', () => {
        const tooltipComponent = this.dynamicComponentCreator.createMapItemTooltip(mapObject);
        marker.unbindTooltip();
        marker
          .bindTooltip(tooltipComponent, {
            className: 'map-item-tooltip',
          })
          .openTooltip();
      });
    } else {
      marker.on('mouseover', () => {
        marker.unbindTooltip();
        marker.bindTooltip(`${mapObject.nrExpl} - ${mapObject.name}`).openTooltip();
      });
    }

    return marker;
  }

  private createMapClusterIcon(cluster: MapClusterModel): DivIcon {
    const cssName = MarkerClusterHelper.getCssClassForClusterGroup(cluster);

    return new DivIcon({
      html: '<div><span>' + cluster.objCount + '</span></div>',
      className: cssName,
      iconSize: new Point(40, 40),
    });
  }

  private createMapObjectIcon(mapItem: MapObjectModel): Icon {
    const iconSuffix: 'good' | 'warning' | 'bad' =
      mapItem.idStatus === MapObjectStatusTypeEnum.OK
        ? 'good'
        : mapItem.idStatus === MapObjectStatusTypeEnum.Warning
        ? 'warning'
        : 'bad';
    let iconUrl = 'assets/leaflet/marker-icon.png';

    if (mapItem.objType === MapObjectTypeEnum.Gpz) {
      iconUrl = `assets/leaflet/GPZ/marker-icon-${iconSuffix}.png`;
    } else if (mapItem.objType === MapObjectTypeEnum.Stacja) {
      iconUrl = `assets/leaflet/SN/marker-icon-${iconSuffix}.png`;
    } else if (mapItem.objType === MapObjectTypeEnum.Szafka) {
      iconUrl = `assets/leaflet/PPE/marker-icon-${iconSuffix}.png`;
    } else if (mapItem.objType === MapObjectTypeEnum.Mde) {
      iconUrl = `assets/leaflet/MDE/marker-icon-${iconSuffix}.png`;
    }

    return new Icon({
      iconSize: [37.5, 61.5],
      iconAnchor: [18.75, 61.5],
      iconUrl: iconUrl,
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      className: iconSuffix,
    });
  }

  private getClusterAreaPolygon(bbox: number[]): Polygon {
    const bboxCoords = [
      [new LatLng(bbox[1], bbox[0]), new LatLng(bbox[1], bbox[2])],
      [new LatLng(bbox[1], bbox[2]), new LatLng(bbox[3], bbox[2])],
      [new LatLng(bbox[3], bbox[2]), new LatLng(bbox[3], bbox[0])],
      [new LatLng(bbox[3], bbox[0]), new LatLng(bbox[1], bbox[0])],
    ];

    return new Polygon(bboxCoords, { color: 'blue', fillOpacity: 0.2 });
  }

  private getClusterAreaGeoJsonPolygon(geoJson: GeoJsonObject): GeoJSON {
    return new GeoJSON(geoJson);
    // return new Polygon(bboxCoords, { color: 'blue', fillOpacity: 0.2 });
  }

  onMapFiltersChanged() {
    this.getObjectsSubscriptions.add(this.loadMapObjects());
  }
}
