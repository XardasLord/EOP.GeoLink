import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { GetReportsResponseModel } from '../models/get-reports-response.model';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../maps/models/map-filter-model';
import { PageEvent } from '@angular/material/paginator';
import { GetReportPreviewRequestModel } from '../models/http-request-models/get-report-preview-request.model';
import { FilterAttributeModel } from '../../../shared/models/filters/filter-attribute.model';

@Injectable()
export class ReportsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    private store: Store,
    httpClient: HttpClient
  ) {
    super(httpClient);
  }

  load(
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedAttributeFilters: FilterAttributeModel[],
    pageInfo: PageEvent,
    includeCount: boolean,
    clusterLevel: number | null = null,
    idCluster: number | null = null
  ): Observable<GetReportsResponseModel> {
    const requestModel: GetReportPreviewRequestModel = {
      count: pageInfo.pageSize,
      offset: pageInfo.pageIndex * pageInfo.pageSize,
      doCount: includeCount ? 1 : 0,
      timeExtent: 1,
      lvl: clusterLevel && idCluster ? clusterLevel : null,
      idCluster: clusterLevel && idCluster ? idCluster : null,
      objectFilters: selectedObjectMapFilters
        .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.id !== null)
        .map(x => x.id),
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
        .map(x => x.id),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
        .map(x => x.id),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
        .map(x => x.id),
      attributeFilters: selectedAttributeFilters,
    };

    return this.httpClient.post<GetReportsResponseModel>(`${this.apiUrl}/reports/getReportPreview`, requestModel);
  }
}
