import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { AvailableAnalyticsModel } from '../models/available-analytics.model';
import { environment } from '../../../../environments/environment';
import { AnalyticModel } from '../models/analytic.model';

@Injectable()
export class AnalyticsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAvailableAnalytics(): Observable<AvailableAnalyticsModel[]> {
    return this.httpClient.get<AvailableAnalyticsModel[]>(`${this.apiUrl}/analytics/getAnalyticsDef`);
  }

  getAnalytics(idAnalytics: number, pageInfo: PageEvent, includeCount: boolean): Observable<AnalyticModel> {
    const params = new HttpParams()
      .set('idAnalytics', idAnalytics)
      .set('offset', pageInfo.pageIndex * pageInfo.pageSize)
      .set('count', pageInfo.pageSize)
      .set('doCount', includeCount ? 1 : 0);

    return this.httpClient.get<AnalyticModel>(`${this.apiUrl}/analytics/getAnalytics`, { params });
  }
}
