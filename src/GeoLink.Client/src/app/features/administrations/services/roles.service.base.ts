import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { RoleModel } from '../models/role.model';

export abstract class IRolesService extends RemoteServiceBase {
  public abstract getAllRoles(): Observable<RoleModel[]>;
}
