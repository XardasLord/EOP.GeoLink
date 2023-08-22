import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { SaveHysteresisConfigCommand } from '../models/commands/save-hysteresis-config.command';
import { HysteresisConfigModel } from '../models/hysteresis-config.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { ConfigResponseModel } from '../../../shared/models/config/config-response.model';
import { ConfigUpdateModel } from '../../../shared/models/config/config-update.model';
import { DictionaryState } from '../../../shared/states/dictionary.state';

@Injectable()
export class HysteresisConfigService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(
    httpClient: HttpClient,
    private store: Store
  ) {
    super(httpClient);
  }

  loadConfig(): Observable<HysteresisConfigModel> {
    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);
    const hysteresisThresholdId = configDefs.filter(x => x.name === 'HYSTERESIS_THRESHOLD').map(x => x.id)[0];
    const hysteresisSensitivityId = configDefs.filter(x => x.name === 'HYSTERESIS_SENSITIVITY').map(x => x.id)[0];

    const params = new HttpParams()
      .append('idConfig', hysteresisThresholdId)
      .append('idConfig', hysteresisSensitivityId);

    return this.httpClient.get<ConfigResponseModel[]>(`${this.apiUrl}/settings/getConfig`, { params }).pipe(
      map((response: ConfigResponseModel[]) => {
        const result: HysteresisConfigModel = {
          availabilityThresholdPercentage: response.filter(x => x.id === hysteresisThresholdId).map(x => x.numVal)[0],
          sensitivenessPercentage: response.filter(x => x.id === hysteresisSensitivityId).map(x => x.numVal)[0],
        };
        return result;
      })
    );
  }

  saveConfig(command: SaveHysteresisConfigCommand): Observable<void> {
    const updateModel: ConfigUpdateModel[] = [];

    const configDefs = this.store.selectSnapshot(DictionaryState.getConfigDefinitions);

    updateModel.push({
      id: configDefs.filter(x => x.name === 'HYSTERESIS_THRESHOLD').map(x => x.id)[0],
      numVal: command.availabilityThresholdPercentage,
      dictVal: undefined,
      textVal: undefined,
    });

    updateModel.push({
      id: configDefs.filter(x => x.name === 'HYSTERESIS_SENSITIVITY').map(x => x.id)[0],
      numVal: command.sensitivenessPercentage,
      dictVal: undefined,
      textVal: undefined,
    });

    return this.httpClient.put<void>(`${this.apiUrl}/settings/setConfig`, updateModel);
  }
}
