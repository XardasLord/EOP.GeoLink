import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { FiltersStateModel } from './filter.state.model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import {
  ChangeFilters,
  ChangeSearchFilters,
  DeviceMapFiltersSelectionChange,
  LoadMapFilters,
  ObjectMapFiltersSelectionChange,
  RegionMapFiltersSelectionChange,
  SetInitialMapFilters,
  StatusMapFiltersSelectionChange,
} from './filter.action';
import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { MapFiltersModel } from '../../features/maps/models/map-filters.model';
import { Observable, tap } from 'rxjs';
import { MapsService } from '../../features/maps/services/maps.service';

const FILTERS_STATE_TOKEN = new StateToken<FiltersStateModel>('filters');

@State<FiltersStateModel>({
  name: FILTERS_STATE_TOKEN,
  defaults: {
    mapFilters: {
      objectFilters: [],
      deviceFilters: [],
      regionFilters: [],
      statusFilters: [],
    },
    selectedObjectMapFilters: [],
    selectedDeviceMapFilters: [],
    selectedRegionMapFilters: [],
    selectedStatusMapFilters: [],
    filterAttributeModels: [],
  },
})
@Injectable()
export class FiltersState {
  constructor(private mapsService: MapsService) {}

  @Selector([FILTERS_STATE_TOKEN])
  static getMapFilters(state: FiltersStateModel): MapFiltersModel {
    return state.mapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedObjectMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.selectedObjectMapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedDeviceMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.selectedDeviceMapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedRegionMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.selectedRegionMapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedStatusMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.selectedStatusMapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getFilterAttributeModels(state: FiltersStateModel): FilterAttributeModel[] {
    return state.filterAttributeModels;
  }

  @Action(ChangeFilters)
  changeFilters(ctx: StateContext<FiltersStateModel>, action: ChangeFilters) {
    ctx.patchState({
      selectedObjectMapFilters: action.selectedObjectMapFilters,
      selectedDeviceMapFilters: action.selectedDeviceMapFilters,
      selectedRegionMapFilters: action.selectedRegionMapFilters,
      selectedStatusMapFilters: action.selectedStatusMapFilters,
    });
  }

  @Action(ChangeSearchFilters)
  changeSearchFilters(ctx: StateContext<FiltersStateModel>, action: ChangeSearchFilters) {
    ctx.patchState({
      filterAttributeModels: action.filterAttributeModel,
    });
  }

  @Action(SetInitialMapFilters)
  setInitialMapFilters(ctx: StateContext<FiltersStateModel>, action: SetInitialMapFilters) {
    const filters = ctx.getState().mapFilters;
    const selectedObjectMapFilters: MapFilterModel[] = [];
    const selectedDeviceMapFilters: MapFilterModel[] = [];
    const selectedRegionMapFilters: MapFilterModel[] = [];
    const selectedStatusMapFilters: MapFilterModel[] = [];

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
    };

    ctx.patchState({
      selectedObjectMapFilters: selectedObjectMapFilters,
      selectedDeviceMapFilters: selectedDeviceMapFilters,
      selectedRegionMapFilters: selectedRegionMapFilters,
      selectedStatusMapFilters: selectedStatusMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(LoadMapFilters)
  loadMapFilters(ctx: StateContext<FiltersStateModel>, _: LoadMapFilters): Observable<MapFilterModel[]> {
    return this.mapsService.getFilters().pipe(
      tap(response => {
        const filters: MapFiltersModel = {
          objectFilters: response.filter(x => x.name === 'Obiekty'),
          deviceFilters: response.filter(x => x.name === 'Urządzenia'),
          regionFilters: response.filter(x => x.name === 'Obszary'),
          statusFilters: response.filter(x => x.name === 'Statusy obiektów'),
        };

        ctx.patchState({
          mapFilters: filters,
        });
      })
    );
  }

  @Action(ObjectMapFiltersSelectionChange)
  objectMapFiltersSelectionChange(ctx: StateContext<FiltersStateModel>, action: ObjectMapFiltersSelectionChange) {
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
      selectedObjectMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(DeviceMapFiltersSelectionChange)
  deviceMapFiltersSelectionChange(ctx: StateContext<FiltersStateModel>, action: DeviceMapFiltersSelectionChange) {
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
  regionMapFiltersSelectionChange(ctx: StateContext<FiltersStateModel>, action: RegionMapFiltersSelectionChange) {
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
      selectedRegionMapFilters: action.selectedMapFilters,
      mapFilters: updatedFilters,
    });
  }

  @Action(StatusMapFiltersSelectionChange)
  statusMapFiltersSelectionChange(ctx: StateContext<FiltersStateModel>, action: StatusMapFiltersSelectionChange) {
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
}
