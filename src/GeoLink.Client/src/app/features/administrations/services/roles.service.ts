import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRolesService } from './roles.service.base';
import { RoleModel } from '../models/role.model';

@Injectable()
export class RolesService extends IRolesService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllRoles(): Observable<RoleModel[]> {
    const roles: RoleModel[] = [
      {
        name: 'Admin',
      },
      {
        name: 'User',
      },
      {
        name: 'Przeglądający',
      },
    ];

    return of(roles);
  }
}
