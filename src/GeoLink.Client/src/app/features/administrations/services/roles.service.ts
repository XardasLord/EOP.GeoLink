import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddRoleCommand } from '../models/commands/add-role.command';
import { EditRoleCommand } from '../models/commands/edit-role.command';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class RolesService extends RemoteServiceBase {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  addRole(command: AddRoleCommand): Observable<number> {
    return of(999);
  }

  editRole(roleId: number, command: EditRoleCommand): Observable<any> {
    return of({});
  }
}
