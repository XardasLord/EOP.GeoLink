import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import { LoadMapFilters } from './maps.action';
import { MapFiltersModel } from '../models/map-filters.model';
import { MapsService } from '../services/maps.service';

const MAPS_STATE_TOKEN = new StateToken<MapsStateModel>('maps');

@State<MapsStateModel>({
  name: MAPS_STATE_TOKEN,
  defaults: {
    mapFilters: {
      objectFilters: [],
      regionFilters: [],
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
}
