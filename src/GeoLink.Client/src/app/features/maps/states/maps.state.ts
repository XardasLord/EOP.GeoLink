import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { MapsStateModel } from './maps.state.model';
import {
  DeviceMapFiltersSelectionChange,
  IpMapFiltersSelectionChange,
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
      deviceFilters: [],
      regionFilters: [],
      statusFilters: [],
      ipFilters: [],
    },
    selectedObjectsMapFilters: [],
    selectedDeviceMapFilters: [],
    selectedRegionMapFilter: [],
    selectedStatusMapFilters: [],
    selectedIpMapFilters: [],
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
  static getDeviceSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedDeviceMapFilters;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getRegionSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedRegionMapFilter;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getStatusSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedStatusMapFilters;
  }

  @Selector([MAPS_STATE_TOKEN])
  static getIpSelectedMapFilters(state: MapsStateModel): MapFilterModel[] {
    return state.selectedIpMapFilters;
  }

  @Action(LoadMapFilters)
  loadMapFilters(ctx: StateContext<MapsStateModel>, _: LoadMapFilters): Observable<MapFilterModel[]> {
    return this.mapsService.getFilters().pipe(
      tap(response => {
        const filters: MapFiltersModel = {
          objectFilters: response.filter(x => x.name === 'Obiekty'),
          deviceFilters: response.filter(x => x.name === 'Urządzenia'),
          regionFilters: response.filter(x => x.name === 'Obszary'),
          statusFilters: response.filter(x => x.name === 'Statusy obiektów'),
          ipFilters: response.filter(x => x.name === 'Adresy IP'),
        };

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

  @Action(DeviceMapFiltersSelectionChange)
  deviceMapFiltersSelectionChange(ctx: StateContext<MapsStateModel>, action: DeviceMapFiltersSelectionChange) {
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
      deviceFilters: filters.deviceFilters.map(deviceFilter => ({
        ...deviceFilter,
        filters: updateFiltersCompleted(deviceFilter.filters),
      })),
    };

    ctx.patchState({
      selectedDeviceMapFilters: action.selectedMapFilters,
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

  @Action(IpMapFiltersSelectionChange)
  ipMapFiltersSelectionChange(ctx: StateContext<MapsStateModel>, action: IpMapFiltersSelectionChange) {
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
      ipFilters: filters.ipFilters.map(ipFilter => ({
        ...ipFilter,
        filters: updateFiltersCompleted(ipFilter.filters),
      })),
    };

    ctx.patchState({
      selectedIpMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(SetInitialMapFilters)
  setInitialMapFilters(ctx: StateContext<MapsStateModel>, action: SetInitialMapFilters) {
    const filters = ctx.getState().mapFilters;
    const selectedObjectMapFilters: MapFilterModel[] = [];
    const selectedDeviceMapFilters: MapFilterModel[] = [];
    const selectedRegionMapFilters: MapFilterModel[] = [];
    const selectedStatusMapFilters: MapFilterModel[] = [];
    const selectedIpMapFilters: MapFilterModel[] = [];

    function updateObjectFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (filter.id === action.objectTypeFilters && filter.apiFilterType === 'ObjectTypeFilters') {
          updatedFilter.completed = true;
          selectedObjectMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateObjectFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    function updateDeviceFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (action.deviceFilters.some(f => f === filter.id && filter.apiFilterType === 'DeviceFilters')) {
          updatedFilter.completed = true;
          selectedDeviceMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateDeviceFiltersCompleted(filter.filters);
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

    function updateIpFiltersCompleted(filters: MapFilterModel[]): MapFilterModel[] {
      return filters.map(filter => {
        const updatedFilter: MapFilterModel = { ...filter };

        if (action.ipFilters.includes(filter.id)) {
          updatedFilter.completed = true;
          selectedIpMapFilters.push(updatedFilter);
        } else {
          updatedFilter.completed = false;
        }

        if (filter.filters) {
          updatedFilter.filters = updateIpFiltersCompleted(filter.filters);
        }

        return updatedFilter;
      });
    }

    const updatedFilters: MapFiltersModel = {
      ...filters,
      objectFilters: filters.objectFilters.map(objectFilters => ({
        ...objectFilters,
        filters: updateObjectFiltersCompleted(objectFilters.filters),
      })),
      deviceFilters: filters.deviceFilters.map(deviceFilters => ({
        ...deviceFilters,
        filters: updateDeviceFiltersCompleted(deviceFilters.filters),
      })),
      regionFilters: filters.regionFilters.map(regionFilters => ({
        ...regionFilters,
        filters: updateRegionFiltersCompleted(regionFilters.filters),
      })),
      statusFilters: filters.statusFilters.map(statusFilter => ({
        ...statusFilter,
        filters: updateStatusFiltersCompleted(statusFilter.filters),
      })),
      ipFilters: filters.ipFilters.map(ipFilter => ({
        ...ipFilter,
        filters: updateIpFiltersCompleted(ipFilter.filters),
      })),
    };

    ctx.patchState({
      selectedObjectsMapFilters: selectedObjectMapFilters,
      selectedDeviceMapFilters: selectedDeviceMapFilters,
      selectedRegionMapFilter: selectedRegionMapFilters,
      selectedStatusMapFilters: selectedStatusMapFilters,
      selectedIpMapFilters: selectedIpMapFilters,
      mapFilters: updatedFilters,
    });
  }
}
