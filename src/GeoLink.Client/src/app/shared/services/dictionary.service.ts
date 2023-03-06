import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { EnumDescriptionModel } from '../models/enum-description.model';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';

@Injectable()
export class DictionaryService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getSystemGroups(): Observable<EnumDescriptionWithScopesModel[]> {
    return this.httpClient.get<EnumDescriptionWithScopesModel[]>(`${this.apiUrl}/settings/getGroups`);
  }

  getSystemRoles(): Observable<EnumDescriptionWithScopesModel[]> {
    return this.httpClient.get<EnumDescriptionWithScopesModel[]>(`${this.apiUrl}/settings/getRoles`);
  }

  getSystemRegions(): Observable<EnumDescriptionRegionModel[]> {
    return this.httpClient.get<EnumDescriptionRegionModel[]>(`${this.apiUrl}/settings/getRegions`);
  }

  getSystemPermission(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/settings/getPermissions`);
  }
}
