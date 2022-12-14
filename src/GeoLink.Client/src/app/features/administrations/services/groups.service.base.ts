import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { GroupModel } from '../models/group.model';

export abstract class IGroupsService extends RemoteServiceBase {
  public abstract getAllGroups(): Observable<GroupModel[]>;
}
