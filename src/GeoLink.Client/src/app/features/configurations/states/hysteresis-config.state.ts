import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { HysteresisConfigStateModel } from './hysteresis-config.state.model';
import { Load, Save } from './hysteresis-config.action';
import { IHysteresisConfigService } from '../services/hysteresis-config.service.base';
import { HysteresisConfigModel } from '../models/hysteresis-config.model';

const HYSTERESIS_CONFIG_STATE_TOKEN = new StateToken<HysteresisConfigStateModel>('hysteresisConfig');

@State<HysteresisConfigStateModel>({
  name: HYSTERESIS_CONFIG_STATE_TOKEN,
  defaults: {
    config: {
      availabilityThresholdPercentage: 10,
      sensitivenessPercentage: 15,
    },
    configFormGroup: DefaultFormStateValue,
  },
})
@Injectable()
export class HysteresisConfigState {
  constructor(private hysteresisConfigService: IHysteresisConfigService, private toastrService: ToastrService) {}

  @Selector([HYSTERESIS_CONFIG_STATE_TOKEN])
  static getConfig(state: HysteresisConfigStateModel): HysteresisConfigModel {
    return state.config;
  }

  @Action(Load)
  loadConfig(ctx: StateContext<HysteresisConfigStateModel>, _: Load) {
    return this.hysteresisConfigService.loadConfig().pipe(
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
  saveConfig(ctx: StateContext<HysteresisConfigStateModel>, action: Save) {
    return this.hysteresisConfigService.saveConfig(action.command).pipe(
      tap(groupId => {
        ctx.setState(
          patch({
            config: {
              availabilityThresholdPercentage: action.command.availabilityThresholdPercentage,
              sensitivenessPercentage: action.command.sensitivenessPercentage,
            },
          })
        );

        this.toastrService.success('Parametry histerezy zostały edytowane', 'Edycja parametrów', {
          onActivateTick: true,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
