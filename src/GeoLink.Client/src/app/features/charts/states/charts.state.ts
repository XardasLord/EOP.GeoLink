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
import { TopLevelFormatterParams } from 'echarts/types/dist/shared';

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
        health: 0,
        chartAxisInfo: {
          x: '',
          y: '',
        },
      },
      dateNow: new Date(),
      dateBegin: new Date(),
      dateEnd: new Date(),
      timeExtent: 0,
      chartTitle: '',
      chartSubtitle: '',
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
  static hasChartData(state: ChartsStateModel): boolean {
    return state.chart?.chartsData?.data?.length > 0;
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
  loadChart(ctx: StateContext<ChartsStateModel>, action: Load) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.chartService
      .getChart(
        action.timeExtent,
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
          const dayMonthInfo: (null | string)[] = [];
          const xAxisData: string[] = [];
          const standardChartData: number[] = [];
          const polynomialChartData: number[] = [];

          response.chartsData.data.forEach(chartData => {
            const date = new Date(chartData.timestamp);
            const formattedDate = `${date.getHours().toString().padStart(2, '0')}:${date
              .getMinutes()
              .toString()
              .padStart(2, '0')}`;

            const formattedDayMonth = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}`;

            dayMonthInfo.push(formattedDayMonth);

            xAxisData.push(formattedDate);
            standardChartData.push(chartData.values[0]);
            polynomialChartData.push(chartData.values[1]);
          });

          const eChartOptions: EChartsOption = {
            legend: {
              data: [response.chartsData.chartNames[0], response.chartsData.chartNames[1]],
              align: 'left',
            },
            tooltip: {
              backgroundColor: 'lightyellow',
            },
            xAxis: {
              data: xAxisData,
              name: response.chartsData.chartAxisInfo.x,
              nameLocation: 'middle',
              nameGap: 50,
              nameTextStyle: {
                color: 'black',
                fontSize: 20,
              },
              silent: false,
              splitLine: {
                show: false,
              },
              axisLabel: {
                formatter: function (value: string, index: number) {
                  const dayMonth = dayMonthInfo[index];

                  return `{bold|${dayMonth}}\n${value}`;
                },
                rich: {
                  bold: {
                    fontWeight: 'bold',
                    color: 'blue',
                  },
                },
              },
            },
            yAxis: {
              name: response.chartsData.chartAxisInfo.y,
              nameLocation: 'middle',
              nameGap: 40,
              nameTextStyle: {
                color: 'black',
                fontSize: 20,
              },
              max: 100,
              min: 0,
              interval: 10,
            },
            series: [
              {
                name: response.chartsData.chartNames[0],
                type: 'line',
                data: standardChartData,
                animationDelay: idx => idx * 10,
                showAllSymbol: true,
              },
              {
                name: response.chartsData.chartNames[1],
                type: 'line',
                data: polynomialChartData,
                lineStyle: {
                  type: 'dotted',
                },
                color: 'red',
                smooth: true,
                animationDelay: idx => idx * 10 + 100,
                showAllSymbol: true,
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
