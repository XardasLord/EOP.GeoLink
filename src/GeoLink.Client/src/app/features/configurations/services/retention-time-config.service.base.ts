import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { RetentionTimeConfigModel } from '../models/retention-time-config.model';
import { SaveRetentionTimeConfigCommand } from '../models/commands/save-retention-time-config.command';

export abstract class IRetentionTimeConfigService extends RemoteServiceBase {
  public abstract loadConfig(): Observable<RetentionTimeConfigModel>;
  public abstract saveConfig(command: SaveRetentionTimeConfigCommand): Observable<any>;
}
