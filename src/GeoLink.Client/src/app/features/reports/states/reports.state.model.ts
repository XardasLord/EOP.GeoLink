import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';
import { MapFilterModel } from '../../maps/models/map-filter-model';
import { ReportOpenMode } from '../models/open-mode.enum';
import { FilterAttributeModel } from '../../../shared/models/filters/filter-attribute.model';

export interface ReportsStateModel {
  loading: boolean;
  openMode: ReportOpenMode;
  clusterLevel: number | null;
  idCluster: number | null;
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponse<ReportModel[]>;
  selectedObjectMapFilters: MapFilterModel[];
  selectedDeviceMapFilters: MapFilterModel[];
  selectedRegionMapFilters: MapFilterModel[];
  selectedStatusMapFilters: MapFilterModel[];
  filterAttributeModels: FilterAttributeModel[];
}
