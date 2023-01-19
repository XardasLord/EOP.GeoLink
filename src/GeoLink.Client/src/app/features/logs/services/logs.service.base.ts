import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { LogModel } from '../models/log.model';

export abstract class ILogsService extends RemoteServiceBase {
  public abstract load(): Observable<LogModel[]>;
}
