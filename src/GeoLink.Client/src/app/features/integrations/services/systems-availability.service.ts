import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { SystemAvailabilityModel } from '../models/system-availability.model';

@Injectable()
export class SystemsAvailabilityService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(): Observable<SystemAvailabilityModel[]> {
    return this.httpClient.get<SystemAvailabilityModel[]>(`${this.apiUrl}/integration/getSystemsInfo`);
  }
}
