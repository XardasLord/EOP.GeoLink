import { ChartTypeEnum } from './chart-type.enum';

export interface SingleDeviceChartDialogModel {
  chartType: ChartTypeEnum;
  deviceId: number;
}
