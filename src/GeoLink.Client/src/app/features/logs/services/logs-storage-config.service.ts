import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILogsStorageConfigService } from './logs-storage-config.service.base';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { SaveLogsStorageConfigCommand } from '../models/commands/save-logs-storage-config.command';

@Injectable()
export class LogsStorageConfigService extends ILogsStorageConfigService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  loadConfig(): Observable<LogsStorageConfigModel> {
    const config: LogsStorageConfigModel = {
      storagePeriod: 2,
    };

    return of(config);
  }

  saveConfig(command: SaveLogsStorageConfigCommand): Observable<any> {
    return of({});
  }
}
