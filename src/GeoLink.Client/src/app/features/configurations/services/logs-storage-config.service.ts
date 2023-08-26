import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { SaveLogsStorageConfigCommand } from '../models/commands/save-logs-storage-config.command';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { DictionaryState } from '../../../shared/states/dictionary.state';
import { ConfigResponseModel } from '../../../shared/models/config/config-response.model';
import { ConfigUpdateModel } from '../../../shared/models/config/config-update.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class LogsStorageConfigService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    httpClient: HttpClient,
    private store: Store
  ) {
    super(httpClient);
  }

  loadConfig(): Observable<LogsStorageConfigModel> {
    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);
    const logRetentionDaysId = configDefs.filter(x => x.name === 'LOGS_RETENTION_DAYS').map(x => x.id)[0];

    const params = new HttpParams().append('idConfig', logRetentionDaysId);

    return this.httpClient.get<ConfigResponseModel[]>(`${this.apiUrl}/settings/getConfig`, { params }).pipe(
      map((response: ConfigResponseModel[]) => {
        const result: LogsStorageConfigModel = {
          storagePeriod: response.filter(x => x.id === logRetentionDaysId).map(x => x.dictVal)[0],
        };
        return result;
      })
    );
  }

  saveConfig(command: SaveLogsStorageConfigCommand): Observable<void> {
    const updateModel: ConfigUpdateModel[] = [];

    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);

    updateModel.push({
      id: configDefs.filter(x => x.name === 'LOGS_RETENTION_DAYS').map(x => x.id)[0],
      numVal: undefined,
      dictVal: command.storagePeriod,
      textVal: undefined,
    });

    return this.httpClient.put<void>(`${this.apiUrl}/settings/setConfig`, updateModel);
  }
}
