import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { RetentionTimeConfigStateModel } from './retention-time-config.state.model';
import { RetentionTimeConfigModel } from '../models/retention-time-config.model';
import { Load, Save } from './retention-time-config.action';
import { RetentionTimeConfigService } from '../services/retention-time-config.service';

const RETENTION_TIME_CONFIG_STATE_TOKEN = new StateToken<RetentionTimeConfigStateModel>('retentionTimeConfig');

@State<RetentionTimeConfigStateModel>({
  name: RETENTION_TIME_CONFIG_STATE_TOKEN,
  defaults: {
    config: {
      historicalDataStoragePeriod: 4,
    },
    configFormGroup: DefaultFormStateValue,
  },
})
@Injectable()
export class RetentionTimeConfigState {
  constructor(
    private retentionTimeConfigService: RetentionTimeConfigService,
    private toastrService: ToastrService
  ) {}

  @Selector([RETENTION_TIME_CONFIG_STATE_TOKEN])
  static getConfig(state: RetentionTimeConfigStateModel): RetentionTimeConfigModel {
    return state.config;
  }

  @Action(Load)
  loadConfig(ctx: StateContext<RetentionTimeConfigStateModel>, _: Load) {
    return this.retentionTimeConfigService.loadConfig().pipe(
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
  saveConfig(ctx: StateContext<RetentionTimeConfigStateModel>, action: Save) {
    return this.retentionTimeConfigService.saveConfig(action.command).pipe(
      tap(() => {
        ctx.setState(
          patch({
            config: {
              historicalDataStoragePeriod: action.command.historicalDataStoragePeriod,
            },
          })
        );

        this.toastrService.success('Parametry czasu retencji zostały edytowane', 'Edycja parametrów', {
          onActivateTick: true,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
