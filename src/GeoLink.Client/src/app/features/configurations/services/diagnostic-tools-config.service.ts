import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { DictionaryState } from '../../../shared/states/dictionary.state';
import { ConfigResponseModel } from '../../../shared/models/config/config-response.model';
import { environment } from '../../../../environments/environment';
import { ConfigUpdateModel } from '../../../shared/models/config/config-update.model';
import { DiagnosticToolsConfigModel } from '../models/diagnostic-tools-config.model';
import { SaveDiagnosticToolsConfigCommand } from '../models/commands/save-diagnostic-tools-config.command';

@Injectable()
export class DiagnosticToolsConfigService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    httpClient: HttpClient,
    private store: Store
  ) {
    super(httpClient);
  }

  loadConfig(): Observable<DiagnosticToolsConfigModel> {
    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);
    const prtgUrlId = configDefs.filter(x => x.name === 'DIAGTOOLS_PRTG_URL').map(x => x.id)[0];
    const consoleSshHostnameId = configDefs.filter(x => x.name === 'DIAGTOOLS_CONSOLE_SSH_HOSTNAME').map(x => x.id)[0];

    const params = new HttpParams().append('idConfig', prtgUrlId).append('idConfig', consoleSshHostnameId);

    return this.httpClient.get<ConfigResponseModel[]>(`${this.apiUrl}/settings/getConfig`, { params }).pipe(
      map((response: ConfigResponseModel[]) => {
        const result: DiagnosticToolsConfigModel = {
          prtgUrl: response.filter(x => x.id === prtgUrlId).map(x => x.textVal)[0],
          consoleSshHostname: response.filter(x => x.id === consoleSshHostnameId).map(x => x.textVal)[0],
        };
        return result;
      })
    );
  }

  saveConfig(command: SaveDiagnosticToolsConfigCommand): Observable<void> {
    const updateModel: ConfigUpdateModel[] = [];

    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);

    updateModel.push({
      id: configDefs.filter(x => x.name === 'DIAGTOOLS_PRTG_URL').map(x => x.id)[0],
      numVal: undefined,
      dictVal: undefined,
      textVal: command.prtgUrl,
    });

    updateModel.push({
      id: configDefs.filter(x => x.name === 'DIAGTOOLS_CONSOLE_SSH_HOSTNAME').map(x => x.id)[0],
      numVal: undefined,
      dictVal: undefined,
      textVal: command.consoleSshHostname,
    });

    return this.httpClient.put<void>(`${this.apiUrl}/settings/setConfig`, updateModel);
  }
}
