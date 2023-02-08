import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { LogsStorageConfigStateModel } from './logs-storage-config.state.model';
import { Load, Save } from './logs-storage-config.action';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { LogsStorageConfigService } from '../services/logs-storage-config.service';

const LOGS_STORAGE_CONFIG_STATE_TOKEN = new StateToken<LogsStorageConfigStateModel>('logsStorageConfig');

@State<LogsStorageConfigStateModel>({
  name: LOGS_STORAGE_CONFIG_STATE_TOKEN,
  defaults: {
    config: {
      storagePeriod: 2,
    },
    configFormGroup: DefaultFormStateValue,
  },
})
@Injectable()
export class LogsStorageConfigState {
  constructor(private logsStorageConfigService: LogsStorageConfigService, private toastrService: ToastrService) {}

  @Selector([LOGS_STORAGE_CONFIG_STATE_TOKEN])
  static getConfig(state: LogsStorageConfigStateModel): LogsStorageConfigModel {
    return state.config;
  }

  @Action(Load)
  loadConfig(ctx: StateContext<LogsStorageConfigStateModel>, _: Load) {
    return this.logsStorageConfigService.loadConfig().pipe(
      tap(response => {
        ctx.patchState({
          config: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(Save)
  saveConfig(ctx: StateContext<LogsStorageConfigStateModel>, action: Save) {
    return this.logsStorageConfigService.saveConfig(action.command).pipe(
      tap(groupId => {
        ctx.setState(
          patch({
            config: {
              storagePeriod: action.command.storagePeriod,
            },
          })
        );

        this.toastrService.success('Parametry przechowywania logu zostały edytowane', 'Edycja parametrów', {
          onActivateTick: true,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
