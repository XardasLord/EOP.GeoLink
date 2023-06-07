import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertModel } from '../models/alert.model';
import { RemoteServiceBase } from './remote-service.base';
import { environment } from '../../../environments/environment';

@Injectable()
export class AlertService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(): Observable<AlertModel[]> {
    return this.httpClient.get<AlertModel[]>(`${this.apiUrl}/interface/getServiceStatus`);
  }
}
