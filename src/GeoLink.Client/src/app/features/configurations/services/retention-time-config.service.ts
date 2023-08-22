import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { RetentionTimeConfigModel } from '../models/retention-time-config.model';
import { SaveRetentionTimeConfigCommand } from '../models/commands/save-retention-time-config.command';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { DictionaryState } from '../../../shared/states/dictionary.state';
import { ConfigResponseModel } from '../../../shared/models/config/config-response.model';
import { environment } from '../../../../environments/environment';
import { ConfigUpdateModel } from '../../../shared/models/config/config-update.model';

@Injectable()
export class RetentionTimeConfigService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    httpClient: HttpClient,
    private store: Store
  ) {
    super(httpClient);
  }

  loadConfig(): Observable<RetentionTimeConfigModel> {
    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);
    const dataRetentionDaysId = configDefs.filter(x => x.name === 'DATA_RETENTION_DAYS').map(x => x.id)[0];
    const dataRetentionActionId = configDefs.filter(x => x.name === 'DATA_RETENTION_ACTION').map(x => x.id)[0];

    const params = new HttpParams().append('idConfig', dataRetentionDaysId).append('idConfig', dataRetentionActionId);

    return this.httpClient.get<ConfigResponseModel[]>(`${this.apiUrl}/settings/getConfig`, { params }).pipe(
      map((response: ConfigResponseModel[]) => {
        const result: RetentionTimeConfigModel = {
          historicalDataStoragePeriod: response.filter(x => x.id === dataRetentionDaysId).map(x => x.dictVal)[0],
          actionAfterRetentionTimePassed: response.filter(x => x.id === dataRetentionActionId).map(x => x.dictVal)[0],
        };
        return result;
      })
    );
  }

  saveConfig(command: SaveRetentionTimeConfigCommand): Observable<void> {
    const updateModel: ConfigUpdateModel[] = [];

    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);

    updateModel.push({
      id: configDefs.filter(x => x.name === 'DATA_RETENTION_DAYS').map(x => x.id)[0],
      numVal: undefined,
      dictVal: command.historicalDataStoragePeriod,
      textVal: undefined,
    });

    updateModel.push({
      id: configDefs.filter(x => x.name === 'DATA_RETENTION_ACTION').map(x => x.id)[0],
      numVal: undefined,
      dictVal: command.actionAfterRetentionTimePassed,
      textVal: undefined,
    });

    return this.httpClient.put<void>(`${this.apiUrl}/settings/setConfig`, updateModel);
  }
}
