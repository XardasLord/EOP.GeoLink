import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import { LoadMapFilters, ObjectMapFiltersSelectionChange, RegionMapFiltersSelectionChange } from './maps.action';
import { MapFiltersModel } from '../models/map-filters.model';
import { MapsService } from '../services/maps.service';
import { MapFilterModel } from '../models/map-filter-model';

const MAPS_STATE_TOKEN = new StateToken<MapsStateModel>('maps');

@State<MapsStateModel>({
  name: MAPS_STATE_TOKEN,
  defaults: {
    mapFilters: {
      objectFilters: [],
      regionFilters: [],
    },
    selectedRegionMapFilter: [],
    selectedObjectsMapFilters: [],
  },
})
@Injectable()
export class MapsState {
  constructor(private mapsService: MapsService) {}

  @Selector([MAPS_STATE_TOKEN])
  static getMapFilters(state: MapsStateModel): MapFiltersModel {
    return state.mapFilters;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getRegionSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedRegionMapFilter;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getObjectSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedObjectsMapFilters;
  }

  @Action(LoadMapFilters)
  loadMapFilters(ctx: StateContext<MapsStateModel>, _: LoadMapFilters): Observable<MapFiltersModel> {
    return this.mapsService.getFilters().pipe(
      tap(filters => {
        ctx.patchState({
          mapFilters: filters,
        });
      })
    );
  }

  @Action(RegionMapFiltersSelectionChange)
  regionMapFiltersSelectionChange(ctx: StateContext<MapsStateModel>, action: RegionMapFiltersSelectionChange) {
    const filters = ctx.getState().mapFilters;

    function updateFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (
          action.selectedMapFilters.some(
            f => f.id === filter.id && f.apiFilterType === filter.apiFilterType && f.name === filter.name
          )
        ) {
          updatedFilter.completed = true;
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    const updatedFilters: MapFiltersModel = {
      ...filters,
      regionFilters: filters.regionFilters.map(regionFilter => ({
        ...regionFilter,
        filters: updateFiltersCompleted(regionFilter.filters),
      })),
    };

    ctx.patchState({
      selectedRegionMapFilter: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(ObjectMapFiltersSelectionChange)
  objectMapFiltersSelectionChange(ctx: StateContext<MapsStateModel>, action: ObjectMapFiltersSelectionChange) {
    const filters = ctx.getState().mapFilters;

    function updateFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (
          action.selectedMapFilters.some(
            f => f.id === filter.id && f.apiFilterType === filter.apiFilterType && f.name === filter.name
          )
        ) {
          updatedFilter.completed = true;
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    const updatedFilters: MapFiltersModel = {
      ...filters,
      objectFilters: filters.objectFilters.map(regionFilter => ({
        ...regionFilter,
        filters: updateFiltersCompleted(regionFilter.filters),
      })),
    };

    ctx.patchState({
      selectedObjectsMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }
}
