import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { AuthScopes } from '../../../shared/auth/models/auth.scopes';
import { environment } from '../../../../environments/environment';
import { EnumDescriptionWithScopesModel } from '../../../shared/models/enum-description-with-scopes.model';

@Injectable()
export class GroupsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  editPrivileges(groupId: number, scopes: AuthScopes[]) {
    return this.httpClient.post(`${this.apiUrl}/settings/setGroupPermissions`, {
      Id: groupId,
      AuthScopes: scopes,
    });
  }
}
