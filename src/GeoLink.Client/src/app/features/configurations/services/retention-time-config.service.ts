import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRetentionTimeConfigService } from './retention-time-config.service.base';
import { RetentionTimeConfigModel } from '../models/retention-time-config.model';
import { SaveRetentionTimeConfigCommand } from '../models/commands/save-retention-time-config.command';

@Injectable()
export class RetentionTimeConfigService extends IRetentionTimeConfigService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  loadConfig(): Observable<RetentionTimeConfigModel> {
    const config: RetentionTimeConfigModel = {
      historicalDataStoragePeriod: 2,
      actionAfterRetentionTimePassed: 2,
    };

    return of(config);
  }

  saveConfig(command: SaveRetentionTimeConfigCommand): Observable<any> {
    return of({});
  }
}
