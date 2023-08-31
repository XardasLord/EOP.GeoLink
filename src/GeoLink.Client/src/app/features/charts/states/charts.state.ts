import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { patch } from '@ngxs/store/operators';
import { ChartsStateModel } from './charts.state.model';
import { ChartService } from '../../../shared/services/chart.service';
import { ChartOpenMode } from '../models/open-mode.enum';
import { ChangeFilters, Load, SetOpenMode } from './charts.action';
import { ChartTypeEnum } from '../../../shared/models/charts/chart-type.enum';
import { ChartModel } from '../../../shared/models/charts/chart.model';

const CHARTS_STATE_TOKEN = new StateToken<ChartsStateModel>('charts');

@State<ChartsStateModel>({
  name: CHARTS_STATE_TOKEN,
  defaults: {
    loading: false,
    openMode: ChartOpenMode.ForCustomSearch,
    chart: null,
    clusterLevel: null,
    idCluster: null,
    selectedObjectMapFilters: [],
    selectedDeviceMapFilters: [],
    selectedRegionMapFilters: [],
    selectedStatusMapFilters: [],
    selectedIpMapFilters: [],
  },
})
@Injectable()
export class ChartsState {
  constructor(private chartService: ChartService) {}

  @Selector([CHARTS_STATE_TOKEN])
  static getIsLoading(state: ChartsStateModel): boolean {
    return state.loading;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getOpenMode(state: ChartsStateModel): ChartOpenMode {
    return state.openMode;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getCharts(state: ChartsStateModel): ChartModel | null {
    return state.chart;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getClusterLabel(state: ChartsStateModel): string {
    return `${state.clusterLevel}_${state.idCluster}`;
  }

  @Action(Load)
  loadReports(ctx: StateContext<ChartsStateModel>, action: Load) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.chartService
      .getChart(
        1,
        ChartTypeEnum.MovingAverage, // TODO: filters
        state.selectedObjectMapFilters,
        state.selectedDeviceMapFilters,
        state.selectedRegionMapFilters,
        state.selectedStatusMapFilters,
        state.selectedIpMapFilters,
        state.clusterLevel,
        state.idCluster
      )
      .pipe(
        tap(response => {
          ctx.patchState({
            chart: response,
          });
        }),
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => {
          ctx.patchState({
            loading: false,
          });
        })
      );
  }

  @Action(ChangeFilters)
  changeFilters(ctx: StateContext<ChartsStateModel>, action: ChangeFilters) {
    ctx.patchState({
      selectedObjectMapFilters: action.selectedObjectMapFilters,
      selectedDeviceMapFilters: action.selectedDeviceMapFilters,
      selectedRegionMapFilters: action.selectedRegionMapFilters,
      selectedStatusMapFilters: action.selectedStatusMapFilters,
      selectedIpMapFilters: action.selectedIpMapFilters,
    });

    return ctx.dispatch(new Load());
  }

  @Action(SetOpenMode)
  setOpenedForGroupReport(ctx: StateContext<ChartsStateModel>, action: SetOpenMode) {
    ctx.setState(
      patch({
        openMode: action.openMode,
        clusterLevel: action.openMode === ChartOpenMode.ForCluster ? action.clusterLevel : null,
        idCluster: action.openMode === ChartOpenMode.ForCluster ? action.idCluster : null,
      })
    );
  }
}
