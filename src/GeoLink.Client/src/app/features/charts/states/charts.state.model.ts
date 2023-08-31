import { MapFilterModel } from '../../maps/models/map-filter-model';
import { ChartOpenMode } from '../models/open-mode.enum';
import { ChartModel } from '../../../shared/models/charts/chart.model';

export interface ChartsStateModel {
  loading: boolean;
  openMode: ChartOpenMode;
  chart: ChartModel | null;
  clusterLevel: number | null;
  idCluster: number | null;
  selectedObjectMapFilters: MapFilterModel[];
  selectedDeviceMapFilters: MapFilterModel[];
  selectedRegionMapFilters: MapFilterModel[];
  selectedStatusMapFilters: MapFilterModel[];
  selectedIpMapFilters: MapFilterModel[];
}
