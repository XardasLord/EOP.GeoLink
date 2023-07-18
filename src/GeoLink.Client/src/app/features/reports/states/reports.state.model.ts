import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';
import { MapFilterModel } from '../../maps/models/map-filter-model';

export interface ReportsStateModel {
  restQuery: RestQueryVo;
  restQueryResponse: RestQueryResponse<ReportModel[]>;
  selectedObjectMapFilters: MapFilterModel[];
  selectedRegionMapFilters: MapFilterModel[];
  selectedStatusMapFilters: MapFilterModel[];
  selectedIpMapFilters: MapFilterModel[];
}
