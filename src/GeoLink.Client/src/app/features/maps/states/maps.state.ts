import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Icon, LeafletMouseEvent, Marker } from 'leaflet';
import * as L from 'leaflet';
import { tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import { LoadMapAreaFilters, LoadMapObjectFilters, LoadMapObjects } from './maps.action';
import { IMapsService } from '../services/maps.service.base';
import { MapItemModel } from '../models/map-item.model';
import { MapFiltersModel } from '../models/map-filters.model';
import { DynamicComponentCreatorHelper } from '../helpers/dynamic-component-creator.helper';

const MAPS_STATE_TOKEN = new StateToken<MapsStateModel>('maps');

@State<MapsStateModel>({
  name: MAPS_STATE_TOKEN,
  defaults: {
    markerClusterData: [],
    mapFilters: {
      objectFilters: [],
      areaFilters: [],
    },
  },
})
@Injectable()
export class MapsState {
  constructor(private mapsService: IMapsService, private componentCreatorHelper: DynamicComponentCreatorHelper) {}

  @Selector([MAPS_STATE_TOKEN])
  static getMapObjects(state: MapsStateModel): L.Marker[] {
    return state.markerClusterData;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getMapFilters(state: MapsStateModel): MapFiltersModel {
    return state.mapFilters;
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
      const popupComponent = this.componentCreatorHelper.createMapItemPopup(mapItem);
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
      const tooltipComponent = this.componentCreatorHelper.createMapItemTooltip(mapItem);
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
