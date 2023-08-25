import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { EnumDescriptionModel } from '../models/enum-description.model';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';
import { DeviceGroupRelationModel } from '../models/device-group-relation.model';
import { ConfigDefinitionModel } from '../models/config/config-definition.model';
import { DiagnosticToolsConfigModel } from '../../features/configurations/models/diagnostic-tools-config.model';

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

  getMapObjectTypes(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/map/getObjectTypes`);
  }

  getMapDeviceTypes(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/map/getDeviceTypes`);
  }

  getMapObjectStatusTypes(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/map/getStatusTypes`);
  }

  getDeviceGroupsRelation(): Observable<DeviceGroupRelationModel[]> {
    return this.httpClient.get<DeviceGroupRelationModel[]>(`${this.apiUrl}/map/getDeviceGroups`);
  }

  getTimeExtentParameterDefinitions(): Observable<EnumDescriptionModel[]> {
    return this.httpClient.get<EnumDescriptionModel[]>(`${this.apiUrl}/interface/getTimeExtentDef`);
  }

  getConfigDefinitions(): Observable<ConfigDefinitionModel[]> {
    const apiUrls = [
      `${this.apiUrl}/settings/getConfigHysteresisDef`,
      `${this.apiUrl}/settings/getConfigRetentionDef`,
      `${this.apiUrl}/settings/getConfigDiagToolsDef`,
    ];

    const observables: Observable<ConfigDefinitionModel[]>[] = apiUrls.map(url =>
      this.httpClient.get<ConfigDefinitionModel[]>(url)
    );

    return forkJoin(observables).pipe(mergeMap(results => results));
  }
}
