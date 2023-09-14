import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { FiltersStateModel } from './filter.state.model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import {
  ChangeSearchFilters,
  DeleteQuickFilter,
  LoadMapFilters,
  LoadQuickFilter,
  LoadQuickFilters,
  SaveQuickFilters,
  SetInitialMapFilters,
  ToggleMapFilter,
} from './filter.action';
import { MapFilterModel } from '../../features/maps/models/map-filter-model';
import { MapFiltersModel } from '../../features/maps/models/map-filters.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MapsService } from '../../features/maps/services/maps.service';
import { QuickFilterModel } from '../models/filters/quick-filter.model';
import { QuickFilterService } from '../services/quick-filter.service';
import { getAllSelectedFilters } from '../helpers/map-filters.helper';
import { FilterTypeEnum } from '../models/filters/filter-type.enum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RoutePaths } from '../../core/modules/app-routing.module';
import { Load as LoadCharts } from '../../features/charts/states/charts.action';
import { Load as LoadReports } from '../../features/reports/states/reports.action';

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
    filterAttributeModels: [],
    quickFilterModels: [],
  },
})
@Injectable()
export class FiltersState {
  constructor(
    private mapsService: MapsService,
    private quickFiltersService: QuickFilterService,
    private toastService: ToastrService,
    private store: Store,
    private router: Router
  ) {}

  @Selector([FILTERS_STATE_TOKEN])
  static getMapFilters(state: FiltersStateModel): MapFiltersModel {
    return state.mapFilters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getMapObjectFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.mapFilters.objectFilters[0].filters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getMapDeviceFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.mapFilters.deviceFilters[0].filters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getMapRegionFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.mapFilters.regionFilters[0].filters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getMapStatusFilters(state: FiltersStateModel): MapFilterModel[] {
    return state.mapFilters.statusFilters[0].filters;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedObjectMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return getAllSelectedFilters(state.mapFilters.objectFilters.flatMap(deviceFilter => deviceFilter.filters));
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedDeviceMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return getAllSelectedFilters(state.mapFilters.deviceFilters.flatMap(deviceFilter => deviceFilter.filters));
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedRegionMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return getAllSelectedFilters(state.mapFilters.regionFilters.flatMap(deviceFilter => deviceFilter.filters));
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getSelectedStatusMapFilters(state: FiltersStateModel): MapFilterModel[] {
    return getAllSelectedFilters(state.mapFilters.statusFilters.flatMap(deviceFilter => deviceFilter.filters));
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getFilterAttributeModels(state: FiltersStateModel): FilterAttributeModel[] {
    return state.filterAttributeModels;
  }

  @Selector([FILTERS_STATE_TOKEN])
  static getQuickFilterModels(state: FiltersStateModel): QuickFilterModel[] {
    return state.quickFilterModels;
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

        if (filter.idFilter === action.objectTypeFilters && filter.apiFilterType === 'ObjectTypeFilters') {
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

        if (action.deviceFilters.some(f => f === filter.idFilter && filter.apiFilterType === 'DeviceFilters')) {
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

        if (action.regionFilters.includes(filter.idFilter!)) {
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

        if (action.statusFilters.includes(filter.idFilter!)) {
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

  @Action(LoadQuickFilters)
  loadQuickFilters(ctx: StateContext<FiltersStateModel>, _: LoadQuickFilters): Observable<QuickFilterModel[]> {
    return this.quickFiltersService.getQuickFilters().pipe(
      tap(response => {
        ctx.patchState({
          quickFilterModels: response,
        });
      })
    );
  }

  @Action(LoadQuickFilter)
  loadQuickFilter(ctx: StateContext<FiltersStateModel>, action: LoadQuickFilter) {
    ctx.dispatch(
      new SetInitialMapFilters(
        action.model.objectFilters[0],
        action.model.deviceFilters,
        action.model.regionFilters,
        action.model.statusFilters
      )
    );

    if (this.router.url.indexOf(`/${RoutePaths.Reports}`) > -1) {
      ctx.dispatch(new LoadReports());
    } else if (this.router.url.indexOf(`/${RoutePaths.Charts}`) > -1) {
      ctx.dispatch(new LoadCharts());
    } else if (this.router.url.indexOf(`/${RoutePaths.Map}`) > -1) {
      // TODO:
    }

    this.toastService.success('Pomyślnie wczytano szybki filtr', 'Sukces');
  }

  @Action(SaveQuickFilters)
  saveQuickFilter(ctx: StateContext<FiltersStateModel>, action: SaveQuickFilters) {
    return this.quickFiltersService.save(action.payload).pipe(
      tap(() => {
        ctx.dispatch(new LoadQuickFilters());

        this.toastService.success('Dodano nowy szybki filtr', 'Sukces');
      }),
      catchError(error => {
        this.toastService.error('Błąd podczas dodawania szybkiego filtru', 'Błąd');
        return throwError(error);
      })
    );
  }

  @Action(DeleteQuickFilter)
  deleteQuickFilter(ctx: StateContext<FiltersStateModel>, action: DeleteQuickFilter) {
    return this.quickFiltersService.delete(action.id).pipe(
      tap(() => {
        ctx.dispatch(new LoadQuickFilters());

        this.toastService.success('Usunięto szybki filtr', 'Sukces');
      }),
      catchError(error => {
        this.toastService.error('Błąd podczas usuwania szybkiego filtru', 'Błąd');
        return throwError(error);
      })
    );
  }

  @Action(ToggleMapFilter)
  toggleMapFilter(ctx: StateContext<FiltersStateModel>, action: ToggleMapFilter) {
    const filters = ctx.getState().mapFilters;

    let updatedFiltersRoot: MapFiltersModel;
    let updatedObjectFilters = [...filters.objectFilters];
    let updatedDeviceFilters = [...filters.deviceFilters];
    let updatedRegionFilters = [...filters.regionFilters];
    let updatedStatusFilters = [...filters.statusFilters];

    if (action.filterType === FilterTypeEnum.Object) {
      updatedObjectFilters = this.toggleFilterRecursively(filters.objectFilters, action.filterId, action.checked);
    } else if (action.filterType === FilterTypeEnum.Device) {
      updatedDeviceFilters = this.toggleFilterRecursively(filters.deviceFilters, action.filterId, action.checked);
    } else if (action.filterType === FilterTypeEnum.Region) {
      updatedRegionFilters = this.toggleFilterRecursively(filters.regionFilters, action.filterId, action.checked);
    } else if (action.filterType === FilterTypeEnum.Status) {
      updatedStatusFilters = this.toggleFilterRecursively(filters.statusFilters, action.filterId, action.checked);
    }

    updatedFiltersRoot = {
      ...filters,
      objectFilters: updatedObjectFilters,
      deviceFilters: updatedDeviceFilters,
      regionFilters: updatedRegionFilters,
      statusFilters: updatedStatusFilters,
    };

    ctx.patchState({
      mapFilters: updatedFiltersRoot,
    });
  }

  private toggleFilterRecursively(filters: MapFilterModel[], filterId: number, completed: boolean): MapFilterModel[] {
    return filters.map(filter => {
      if (filter.idFilter === filterId) {
        // Aktualizujemy completed rodzica
        filter = { ...filter, completed };
      } else if (filter.filters && filter.filters.length) {
        // Rekurencyjnie aktualizujemy dzieci
        filter = { ...filter, filters: this.toggleFilterRecursively(filter.filters, filterId, completed) };

        // Jeśli jakieś dziecko nie jest zaznaczone, to rodzic też nie jest zaznaczony
        const isAnyChildUnchecked = filter.filters.some(childFilter => !childFilter.completed);
        filter.completed = !isAnyChildUnchecked;
      }

      return filter;
    });
  }
}
