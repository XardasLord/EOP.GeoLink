import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SaveHysteresisConfigCommand } from '../models/commands/save-hysteresis-config.command';
import { HysteresisConfigModel } from '../models/hysteresis-config.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class HysteresisConfigService extends RemoteServiceBase {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  loadConfig(): Observable<HysteresisConfigModel> {
    const config: HysteresisConfigModel = {
      availabilityThresholdPercentage: 20,
      sensitivenessPercentage: 25,
    };

    return of(config);
  }

  saveConfig(command: SaveHysteresisConfigCommand): Observable<any> {
    return of({});
  }
}
