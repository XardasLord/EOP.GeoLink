import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { SaveHysteresisConfigCommand } from '../models/commands/save-hysteresis-config.command';
import { HysteresisConfigModel } from '../models/hysteresis-config.model';

export abstract class IHysteresisConfigService extends RemoteServiceBase {
  public abstract loadConfig(): Observable<HysteresisConfigModel>;
  public abstract saveConfig(command: SaveHysteresisConfigCommand): Observable<any>;
}
