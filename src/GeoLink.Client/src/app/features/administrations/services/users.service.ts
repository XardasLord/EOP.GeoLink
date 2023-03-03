import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UsersService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.apiUrl}/settings/getUsers`);
  }
}
