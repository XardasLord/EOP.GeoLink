import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import { LoadMapAreaFilters, LoadMapFilters, LoadMapObjectFilters } from './maps.action';
import { MapFiltersModel } from '../models/map-filters.model';
import { MapsService } from '../services/maps.service';

const MAPS_STATE_TOKEN = new StateToken<MapsStateModel>('maps');

@State<MapsStateModel>({
  name: MAPS_STATE_TOKEN,
  defaults: {
    mapFilters: {
      objectFilters: [],
      areaFilters: [],
    },
  },
})
@Injectable()
export class MapsState {
  constructor(private mapsService: MapsService) {}

  @Selector([MAPS_STATE_TOKEN])
  static getMapFilters(state: MapsStateModel): MapFiltersModel {
    return state.mapFilters;
  }

  @Action(LoadMapFilters)
  loadMapFilters(ctx: StateContext<MapsStateModel>, _: LoadMapFilters) {
    return this.mapsService.getFilters().pipe(
      tap(filters => {
        ctx.patchState({
          mapFilters: filters,
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
}
