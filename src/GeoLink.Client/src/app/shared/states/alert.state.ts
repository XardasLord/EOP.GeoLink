import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { AlertStateModel } from './alert.state.model';
import { AlertModel } from '../models/alert.model';
import { Load } from './alert.action';
import { AlertService } from '../services/alert.service';

export const ALERT_STATE_TOKEN = new StateToken<AlertStateModel>('alert');

@State<AlertStateModel>({
  name: ALERT_STATE_TOKEN,
  defaults: {
    alerts: [],
  },
})
@Injectable()
export class AlertState {
  constructor(private alertsService: AlertService) {}

  @Selector([ALERT_STATE_TOKEN])
  static getAlerts(state: AlertStateModel): AlertModel[] {
    return state.alerts;
  }

  @Selector([ALERT_STATE_TOKEN])
  static getAlertsCount(state: AlertStateModel): number {
    return state.alerts.length;
  }

  @Action(Load)
  load(ctx: StateContext<AlertStateModel>, _: Load) {
    return this.alertsService.load().pipe(
      tap(response => {
        ctx.patchState({
          alerts: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
