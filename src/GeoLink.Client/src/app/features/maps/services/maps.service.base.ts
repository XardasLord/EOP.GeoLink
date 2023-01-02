import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { Observable } from 'rxjs';
import { MapItemModel } from '../models/map-item.model';
import { MapObjectFiltersModel } from '../models/map-object-filter.model';
import { MapAreaFiltersModel } from '../models/map-area-filters.model';

export abstract class IMapsService extends RemoteServiceBase {
  public abstract getAllObjects(): Observable<MapItemModel[]>;
  public abstract getObjectFilters(): Observable<MapObjectFiltersModel[]>;
  public abstract getAreaFilters(): Observable<MapAreaFiltersModel[]>;
}
