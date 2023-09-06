import { ChartOpenMode } from '../models/open-mode.enum';
import { ChartModel } from '../../../shared/models/charts/chart.model';
import { EChartsOption } from 'echarts';

export interface ChartsStateModel {
  loading: boolean;
  openMode: ChartOpenMode;
  chart: ChartModel;
  echartsOption: EChartsOption;
  clusterLevel: number | null;
  idCluster: number | null;
}
