import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { DiagnosticToolsConfigStateModel } from './diagnostic-tools-config.state.model';
import { DiagnosticToolsConfigService } from '../services/diagnostic-tools-config.service';
import { DiagnosticToolsConfigModel } from '../models/diagnostic-tools-config.model';
import { Load, Save } from './diagnostic-tools-config.action';

const DIAGNOSTIC_TOOLS_CONFIG_STATE_TOKEN = new StateToken<DiagnosticToolsConfigStateModel>('diagnosticToolsConfig');

@State<DiagnosticToolsConfigStateModel>({
  name: DIAGNOSTIC_TOOLS_CONFIG_STATE_TOKEN,
  defaults: {
    config: {
      prtgUrl: '',
      consoleSshHostname: '',
    },
    configFormGroup: DefaultFormStateValue,
  },
})
@Injectable()
export class DiagnosticToolsConfigState {
  constructor(
    private diagnosticToolsConfigService: DiagnosticToolsConfigService,
    private toastrService: ToastrService
  ) {}

  @Selector([DIAGNOSTIC_TOOLS_CONFIG_STATE_TOKEN])
  static getConfig(state: DiagnosticToolsConfigStateModel): DiagnosticToolsConfigModel {
    return state.config;
  }

  @Action(Load)
  loadConfig(ctx: StateContext<DiagnosticToolsConfigStateModel>, _: Load) {
    return this.diagnosticToolsConfigService.loadConfig().pipe(
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
  saveConfig(ctx: StateContext<DiagnosticToolsConfigStateModel>, action: Save) {
    return this.diagnosticToolsConfigService.saveConfig(action.command).pipe(
      tap(() => {
        ctx.setState(
          patch({
            config: {
              prtgUrl: action.command.prtgUrl,
              consoleSshHostname: action.command.consoleSshHostname,
            },
          })
        );

        this.toastrService.success('Parametry narzędzi diagnostycznych zostały edytowane', 'Edycja parametrów', {
          onActivateTick: true,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
