import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { SaveStatusConfigCommand } from '../models/commands/save-status-config.command';
import { StatusConfigModel } from '../../../shared/models/status-config.model';

@Injectable()
export class StatusesConfigService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    httpClient: HttpClient,
    private store: Store
  ) {
    super(httpClient);
  }

  load(): Observable<StatusConfigModel[]> {
    return this.httpClient.get<StatusConfigModel[]>(`${this.apiUrl}/settings/getStatAggrConfig`);
  }

  saveConfig(command: SaveStatusConfigCommand): Observable<void> {
    return this.httpClient.patch<void>(`${this.apiUrl}/settings/setStatAggrConfig/${command.id}`, {
      srcStatus: command.sourceStatus,
      srcStatusDescription: command.sourceStatusDescription,
      idStatus: command.geoLinkStatus,
    });
  }
}
