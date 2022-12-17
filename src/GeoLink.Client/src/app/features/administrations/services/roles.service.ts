import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRolesService } from './roles.service.base';
import { RoleModel } from '../models/role.model';
import { AddRoleCommand } from '../models/commands/add-role.command';
import { EditRoleCommand } from '../models/commands/edit-role.command';

@Injectable()
export class RolesService extends IRolesService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllRoles(): Observable<RoleModel[]> {
    const roles: RoleModel[] = [
      {
        id: 1,
        name: 'Admin',
      },
      {
        id: 2,
        name: 'User',
      },
      {
        id: 3,
        name: 'Przeglądający',
      },
    ];

    return of(roles);
  }

  addRole(command: AddRoleCommand): Observable<number> {
    return of(999);
  }

  editRole(roleId: number, command: EditRoleCommand): Observable<any> {
    return of({});
  }
}
