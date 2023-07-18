import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { GetReportsResponseModel } from '../models/get-reports-response.model';
import { MapsState } from '../../maps/states/maps.state';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../maps/models/map-filter-model';
import { PageEvent } from '@angular/material/paginator';

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
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedIpMapFilters: MapFilterModel[],
    pageInfo: PageEvent
  ): Observable<GetReportsResponseModel> {
    let params = new HttpParams().set('offset', pageInfo.pageIndex * pageInfo.pageSize).set('count', pageInfo.pageSize);

    params = this.setFilters(
      params,
      selectedObjectMapFilters,
      selectedRegionMapFilters,
      selectedStatusMapFilters,
      selectedIpMapFilters
    );

    return this.httpClient.get<GetReportsResponseModel>(`${this.apiUrl}/reports/getReportPreview`, { params });
  }

  private setFilters(
    httpParams: HttpParams,
    selectedObjectMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedIpMapFilters: MapFilterModel[]
  ): HttpParams {
    selectedObjectMapFilters
      .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('objectTypeFilters', filter.id);
      });

    selectedObjectMapFilters
      .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('deviceFilters', filter.id);
      });

    selectedRegionMapFilters
      .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('regionFilters', filter.id);
      });

    selectedStatusMapFilters
      .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('statusFilters', filter.id);
      });

    selectedIpMapFilters
      .filter(x => x.apiFilterType === 'IpFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('ipFilters', filter.id);
      });

    return httpParams;
  }
}
