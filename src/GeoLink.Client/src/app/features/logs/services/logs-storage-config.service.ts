import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { SaveLogsStorageConfigCommand } from '../models/commands/save-logs-storage-config.command';

@Injectable()
export class LogsStorageConfigService {
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
