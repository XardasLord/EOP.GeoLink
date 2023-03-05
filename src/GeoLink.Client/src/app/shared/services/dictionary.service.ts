import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { EnumDescriptionModel } from '../models/enum-description.model';

@Injectable()
export class DictionaryService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getSystemGroups(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/settings/getGroups`);
  }

  getSystemRoles(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/settings/getRoles`);
  }

  getSystemRegions(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/settings/getRegions`);
  }

  getSystemPermission(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/settings/getPermissions`);
  }
}
