import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { SaveLogsStorageConfigCommand } from '../models/commands/save-logs-storage-config.command';

export abstract class ILogsStorageConfigService extends RemoteServiceBase {
  public abstract loadConfig(): Observable<LogsStorageConfigModel>;
  public abstract saveConfig(command: SaveLogsStorageConfigCommand): Observable<any>;
}
