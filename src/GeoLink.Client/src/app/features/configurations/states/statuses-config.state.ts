import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { StatusesConfigStateModel } from './statuses-config.state.model';
import { Load, Save } from './statuses-config.action';
import { StatusesConfigService } from '../services/statuses-config.service';
import { CloseModal } from '../../../shared/states/modal.action';
import { StatusConfigModel } from '../../../shared/models/status-config.model';

const STATUSES_CONFIG_STATE_TOKEN = new StateToken<StatusesConfigStateModel>('statusesConfig');

@State<StatusesConfigStateModel>({
  name: STATUSES_CONFIG_STATE_TOKEN,
  defaults: {
    configs: [],
    configFormGroup: DefaultFormStateValue,
  },
})
@Injectable()
export class StatusesConfigState {
  constructor(
    private statusesConfigService: StatusesConfigService,
    private toastService: ToastrService
  ) {}

  @Selector([STATUSES_CONFIG_STATE_TOKEN])
  static getStatusesConfig(state: StatusesConfigStateModel): StatusConfigModel[] {
    return state.configs;
  }

  @Selector([STATUSES_CONFIG_STATE_TOKEN])
  static getStatusesConfigGroupedByAttributeSourceType(
    state: StatusesConfigStateModel
  ): Map<number, StatusConfigModel[]> {
    return state.configs.reduce((grouped, item) => {
      if (!grouped.has(item.idSrc)) {
        grouped.set(item.idSrc, []);
      }

      grouped.get(item.idSrc)!.push(item);

      return grouped;
    }, new Map<number, StatusConfigModel[]>());
  }

  @Action(Load)
  loadConfig(ctx: StateContext<StatusesConfigStateModel>) {
    return this.statusesConfigService.load().pipe(
      tap(response => {
        ctx.patchState({
          configs: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(Save)
  saveConfig(ctx: StateContext<StatusesConfigStateModel>, action: Save) {
    return this.statusesConfigService.saveConfig(action.command).pipe(
      tap(() => {
        this.toastService.success('Status atrybutu został edytowany', 'Edycja statusu', {
          onActivateTick: true,
        });

        ctx.dispatch([new Load(), new CloseModal()]);
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastService.error(error.error, 'Edycja statusu', {
          onActivateTick: true,
        });

        return EMPTY;
      })
    );
  }
}
