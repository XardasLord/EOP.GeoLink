import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

export abstract class IAnalyticsService extends RemoteServiceBase {
  public abstract loadConjunction(): Observable<string[]>;
  public abstract loadAlgorithms(): Observable<string[]>;
}
