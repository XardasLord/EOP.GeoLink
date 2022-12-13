import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

export abstract class IAdministrationsService extends RemoteServiceBase {
  public abstract getAllUsers(): Observable<UserModel[]>;
}
