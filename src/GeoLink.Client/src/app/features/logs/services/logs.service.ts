import { Injectable } from '@angular/core';
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

  load(): Observable<GetLogsResponseModel> {
    const params = new HttpParams().set('offset', 0).set('count', 50);

    return this.httpClient.get<GetLogsResponseModel>(`${this.apiUrl}/logs/getLogs`, { params });
  }
}
