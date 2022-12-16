import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { GroupModel } from '../models/group.model';
import { AddNewGroupCommand } from '../commands/add-new-group.command';

export abstract class IGroupsService extends RemoteServiceBase {
  public abstract getAllGroups(): Observable<GroupModel[]>;
  public abstract addNewGroup(command: AddNewGroupCommand): Observable<number>;
}
