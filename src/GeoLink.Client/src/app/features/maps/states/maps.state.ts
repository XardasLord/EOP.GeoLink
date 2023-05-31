import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import {
  LoadMapFilters,
  ObjectMapFiltersSelectionChange,
  RegionMapFiltersSelectionChange,
  SetInitialMapFilters,
  StatusMapFiltersSelectionChange,
} from './maps.action';
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
      statusFilters: [],
    },
    selectedObjectsMapFilters: [],
    selectedRegionMapFilter: [],
    selectedStatusMapFilters: [],
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
  static getObjectSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedObjectsMapFilters;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getRegionSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedRegionMapFilter;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getStatusSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedStatusMapFilters;
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
      objectFilters: filters.objectFilters.map(objectFilter => ({
        ...objectFilter,
        filters: updateFiltersCompleted(objectFilter.filters),
      })),
    };

    ctx.patchState({
      selectedObjectsMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
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

  @Action(StatusMapFiltersSelectionChange)
  statusMapFiltersSelectionChange(ctx: StateContext<MapsStateModel>, action: StatusMapFiltersSelectionChange) {
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
      statusFilters: filters.statusFilters.map(statusFilter => ({
        ...statusFilter,
        filters: updateFiltersCompleted(statusFilter.filters),
      })),
    };

    ctx.patchState({
      selectedStatusMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(SetInitialMapFilters)
  setInitialMapFilters(ctx: StateContext<MapsStateModel>, action: SetInitialMapFilters) {
    const filters = ctx.getState().mapFilters;
    const selectedObjectAndDeviceMapFilters: MapFilterModel[] = [];
    const selectedRegionMapFilters: MapFilterModel[] = [];
    const selectedStatusMapFilters: MapFilterModel[] = [];

    function updateObjectAndDeviceFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (
          action.deviceFilters.some(f => f === filter.id && filter.apiFilterType === 'DeviceFilters') ||
          (filter.id === action.objectTypeFilters && filter.apiFilterType === 'ObjectTypeFilters')
        ) {
          updatedFilter.completed = true;
          selectedObjectAndDeviceMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateObjectAndDeviceFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    function updateRegionFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (action.regionFilters.includes(filter.id)) {
          updatedFilter.completed = true;
          selectedRegionMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateRegionFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    function updateStatusFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (action.statusFilters.includes(filter.id)) {
          updatedFilter.completed = true;
          selectedStatusMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateStatusFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    const updatedFilters: MapFiltersModel = {
      ...filters,
      objectFilters: filters.objectFilters.map(objectFilters => ({
        ...objectFilters,
        filters: updateObjectAndDeviceFiltersCompleted(objectFilters.filters),
      })),
      regionFilters: filters.regionFilters.map(regionFilters => ({
        ...regionFilters,
        filters: updateRegionFiltersCompleted(regionFilters.filters),
      })),
      statusFilters: filters.statusFilters.map(statusFilter => ({
        ...statusFilter,
        filters: updateStatusFiltersCompleted(statusFilter.filters),
      })),
    };

    ctx.patchState({
      selectedObjectsMapFilters: selectedObjectAndDeviceMapFilters,
      selectedRegionMapFilter: selectedRegionMapFilters,
      selectedStatusMapFilters: selectedStatusMapFilters,
      mapFilters: updatedFilters,
    });
  }
}
