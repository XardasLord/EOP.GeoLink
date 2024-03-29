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
import { GenerateReportRequestModel } from '../models/http-request-models/generate-report-request.model';
import { GenerateCsvResponseModel } from '../../../shared/models/csv/generate-csv-response.model';

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
        .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      attributeFilters: selectedAttributeFilters,
    };

    return this.httpClient.post<GetReportsResponseModel>(`${this.apiUrl}/reports/getReportPreview`, requestModel);
  }

  generateReportCsvRequest(
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedAttributeFilters: FilterAttributeModel[],
    clusterLevel: number | null = null,
    idCluster: number | null = null
  ): Observable<GenerateCsvResponseModel> {
    const requestModel: GenerateReportRequestModel = {
      timeExtent: 1,
      lvl: clusterLevel && idCluster ? clusterLevel : null,
      idCluster: clusterLevel && idCluster ? idCluster : null,
      objectFilters: selectedObjectMapFilters
        .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.apiValue !== null)
        .map(x => x.apiValue!),
      attributeFilters: selectedAttributeFilters,
    };

    return this.httpClient.post<GenerateCsvResponseModel>(`${this.apiUrl}/reports/reportFile/init`, requestModel);
  }

  checkReportGenerationStatus(reportIdentifiedKey: string): Observable<GenerateCsvResponseModel> {
    return this.httpClient.get<GenerateCsvResponseModel>(
      `${this.apiUrl}/reports/reportFile/status/${reportIdentifiedKey}`
    );
  }
}
