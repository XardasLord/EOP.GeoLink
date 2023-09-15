import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { EChartsOption } from 'echarts';
import { ChartsStateModel } from './charts.state.model';
import { ChartService } from '../../../shared/services/chart.service';
import { ChartOpenMode } from '../models/open-mode.enum';
import { Load, SetOpenMode } from './charts.action';
import { ChartTypeEnum } from '../../../shared/models/charts/chart-type.enum';
import { ChartModel } from '../../../shared/models/charts/chart.model';
import { FiltersState } from '../../../shared/states/filters.state';

const CHARTS_STATE_TOKEN = new StateToken<ChartsStateModel>('charts');

@State<ChartsStateModel>({
  name: CHARTS_STATE_TOKEN,
  defaults: {
    loading: false,
    openMode: ChartOpenMode.ForCustomSearch,
    chart: {
      chartsData: {
        data: [],
        chartNames: [],
        avgAvail: 0,
        devHealth: 0,
      },
      dateNow: new Date(),
      dateBegin: new Date(),
      dateEnd: new Date(),
      timeExtent: 0,
    },
    echartsOption: {
      legend: {
        data: ['bar'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: [],
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'line',
          data: [],
          animationDelay: idx => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    },
    clusterLevel: null,
    idCluster: null,
  },
})
@Injectable()
export class ChartsState {
  constructor(
    private store: Store,
    private chartService: ChartService
  ) {}

  @Selector([CHARTS_STATE_TOKEN])
  static getIsLoading(state: ChartsStateModel): boolean {
    return state.loading;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getOpenMode(state: ChartsStateModel): ChartOpenMode {
    return state.openMode;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getChart(state: ChartsStateModel): ChartModel {
    return state.chart;
  }

  @Selector([CHARTS_STATE_TOKEN])
  static getEChartsOption(state: ChartsStateModel): EChartsOption {
    return state.echartsOption;
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
        ChartTypeEnum.MovingAverage,
        this.store.selectSnapshot(FiltersState.getSelectedObjectMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters),
        this.store.selectSnapshot(FiltersState.getFilterAttributeModels),
        state.clusterLevel,
        state.idCluster
      )
      .pipe(
        tap(response => {
          const xAxisData: string[] = [];
          const standardChartData: number[] = [];
          const polynomialChartData: number[] = [];

          response.chartsData.data.forEach(chartData => {
            const date = new Date(chartData.timestamp);
            const formattedDate = `${date.getHours().toString()}:${date.getMinutes().toString()}`;

            xAxisData.push(formattedDate);
            standardChartData.push(chartData.values[0]);
            polynomialChartData.push(chartData.values[1]);
          });

          const eChartOptions: EChartsOption = {
            legend: {
              data: [response.chartsData.chartNames[0], response.chartsData.chartNames[1]],
              align: 'left',
            },
            tooltip: {},
            xAxis: {
              data: xAxisData,
              silent: false,
              splitLine: {
                show: false,
              },
            },
            yAxis: {},
            series: [
              {
                name: response.chartsData.chartNames[0],
                type: 'line',
                data: standardChartData,
                animationDelay: idx => idx * 10,
              },
              {
                name: response.chartsData.chartNames[1],
                type: 'line',
                lineStyle: {
                  type: 'dotted',
                },
                color: 'red',
                smooth: true,
                data: polynomialChartData,
                animationDelay: idx => idx * 10 + 100,
              },
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
          };

          ctx.patchState({
            chart: response,
            echartsOption: eChartOptions,
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
