import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import {
  circle,
  Control,
  Icon,
  latLng,
  Layer,
  LeafletMouseEvent,
  MapOptions,
  Marker,
  polygon,
  tileLayer,
} from 'leaflet';
import * as L from 'leaflet';
import { tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import { LoadMapAreaFilters, LoadMapBackground, LoadMapObjectFilters, LoadMapObjects } from './maps.action';
import Scale = Control.Scale;
import { IMapsService } from '../services/maps.service.base';
import { MapItemModel } from '../models/map-item.model';
import { MarkerClusterHelper } from '../helpers/marker-cluster.helper';
import { MapItemTooltipDialogComponent } from '../components/map-item-tooltip-dialog/map-item-tooltip-dialog.component';
import { MapFiltersModel } from '../models/map-filters.model';
import { MapItemContextDialogComponent } from '../components/map-item-context-dialog/map-item-context-dialog.component';

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
    markerClusterOptions: {
      maxClusterRadius: 120,
      iconCreateFunction: function (cluster) {
        const childMarkers: Marker<MapItemModel>[] = cluster.getAllChildMarkers();
        const css = new MarkerClusterHelper().getCssClassForClusterGroup(childMarkers);

        return new L.DivIcon({
          html: '<div><span>' + childMarkers.length + '</span></div>',
          className: `marker-cluster-base marker-cluster-${css}`,
          iconSize: new L.Point(40, 40),
        });
      },
      // Popup by clicking on cluster group icon - https://stackoverflow.com/questions/38824030/how-to-show-popup-on-click-leaflet-cluster-group
    },
    mapScale: new Scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 200,
    }),
    mapFilters: {
      objectFilters: [],
      areaFilters: [],
    },
  },
})
@Injectable()
export class MapsState {
  constructor(
    private mapsService: IMapsService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

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

  @Selector([MAPS_STATE_TOKEN])
  static getMapScale(state: MapsStateModel): Scale {
    return state.mapScale;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMapFilters(state: MapsStateModel): MapFiltersModel {
    return state.mapFilters;
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
      ],
    });
  }

  @Action(LoadMapObjects)
  loadMapObjects(ctx: StateContext<MapsStateModel>, _: LoadMapObjects) {
    return this.mapsService.getAllObjects().pipe(
      tap(mapItems => {
        const markers: L.Marker<MapItemModel>[] = [];

        mapItems.forEach((mapItem: MapItemModel) => {
          const marker = this.createMapItemMarker(mapItem);

          markers.push(marker);
        });

        ctx.patchState({
          markerClusterData: [...markers],
        });
      })
    );
  }

  @Action(LoadMapObjectFilters)
  loadMapObjectFilters(ctx: StateContext<MapsStateModel>, _: LoadMapObjectFilters) {
    return this.mapsService.getObjectFilters().pipe(
      tap(objectFilters => {
        ctx.patchState({
          mapFilters: {
            ...ctx.getState().mapFilters,
            objectFilters: objectFilters,
          },
        });
      })
    );
  }

  @Action(LoadMapAreaFilters)
  loadMapAreaFilters(ctx: StateContext<MapsStateModel>, _: LoadMapAreaFilters) {
    return this.mapsService.getAreaFilters().pipe(
      tap(areaFilters => {
        ctx.patchState({
          mapFilters: {
            ...ctx.getState().mapFilters,
            areaFilters: areaFilters,
          },
        });
      })
    );
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
      const popupComponent = this.createMapItemPopup(mapItem);
      marker.unbindPopup();
      marker.bindPopup(popupComponent).openPopup();
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
      const tooltipComponent = this.createMapItemTooltip(mapItem);
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

  private createMapItemPopup(item: MapItemModel) {
    // Bind custom Angular Component as a popup/tooltip - https://stackoverflow.com/questions/42340067/angular-component-into-leaflet-popup
    // Another solution - https://stackoverflow.com/a/45107300/3921353
    // Another solution - https://stackoverflow.com/a/57773246/3921353
    const componentRef = this.resolver.resolveComponentFactory(MapItemContextDialogComponent).create(this.injector);

    componentRef.instance.mapItem = item;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  private createMapItemTooltip(item: MapItemModel) {
    // Bind custom Angular Component as a popup/tooltip - https://stackoverflow.com/questions/42340067/angular-component-into-leaflet-popup
    // Another solution - https://stackoverflow.com/a/45107300/3921353
    // Another solution - https://stackoverflow.com/a/57773246/3921353
    const componentRef = this.resolver.resolveComponentFactory(MapItemTooltipDialogComponent).create(this.injector);

    componentRef.instance.mapItem = item;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }
}
