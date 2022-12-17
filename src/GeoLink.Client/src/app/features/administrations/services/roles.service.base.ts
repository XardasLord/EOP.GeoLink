import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { RoleModel } from '../models/role.model';
import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { EditRoleCommand } from '../models/commands/edit-role.command';
import { AddRoleCommand } from '../models/commands/add-role.command';

export abstract class IRolesService extends RemoteServiceBase {
  public abstract getAllRoles(): Observable<RoleModel[]>;
  public abstract addRole(command: AddRoleCommand): Observable<number>;
  public abstract editRole(roleId: number, command: EditRoleCommand): Observable<any>;
}
