import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogModel } from '../models/log.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LogsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(): Observable<LogModel[]> {
    const params = new HttpParams().set('offset', 0).set('count', 50);

    return this.httpClient.get<LogModel[]>(`${this.apiUrl}/logs/getLogs`, { params });
  }
}
