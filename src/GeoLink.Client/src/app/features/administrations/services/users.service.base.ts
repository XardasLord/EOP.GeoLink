import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

export abstract class IUsersService extends RemoteServiceBase {
  public abstract getAllUsers(): Observable<UserModel[]>;
}
