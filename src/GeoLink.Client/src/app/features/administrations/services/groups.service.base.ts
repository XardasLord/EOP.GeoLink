import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { GroupModel } from '../models/group.model';
import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { EditGroupCommand } from '../models/commands/edit-group.command';

export abstract class IGroupsService extends RemoteServiceBase {
  public abstract getAllGroups(): Observable<GroupModel[]>;
  public abstract addGroup(command: AddNewGroupCommand): Observable<number>;
  public abstract editGroup(groupId: number, command: EditGroupCommand): Observable<any>;
}
