import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { AuthScopes } from '../../../shared/auth/models/auth.scopes';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RolesService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  editPrivileges(roleId: number, scopes: AuthScopes[]) {
    return this.httpClient.post(`${this.apiUrl}/settings/setRolePermissions`, {
      Id: roleId,
      AuthScopes: scopes,
    });
  }
}
