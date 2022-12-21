import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { Observable } from 'rxjs';
import { MapItemModel } from '../models/map-item.model';

export abstract class IMapsService extends RemoteServiceBase {
  public abstract getAllObjects(): Observable<MapItemModel[]>;
}
