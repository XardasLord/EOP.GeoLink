import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetLogsResponseModel } from '../models/get-logs-response.model';

@Injectable()
export class LogsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(pageInfo: PageEvent): Observable<GetLogsResponseModel> {
    const params = new HttpParams()
      .set('offset', pageInfo.pageIndex * pageInfo.pageSize)
      .set('count', pageInfo.pageSize);

    return this.httpClient.get<GetLogsResponseModel>(`${this.apiUrl}/logs/getLogs`, { params });
  }
}
