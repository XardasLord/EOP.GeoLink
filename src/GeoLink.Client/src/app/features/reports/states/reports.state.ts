import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { ReportsStateModel } from './reports.state.model';
import { LogModel } from '../../logs/models/log.model';
import { Load } from './reports.action';
import { LogsService } from '../../logs/services/logs.service';

const REPORTS_STATE_TOKEN = new StateToken<ReportsStateModel>('reports');

@State<ReportsStateModel>({
  name: REPORTS_STATE_TOKEN,
  defaults: {
    logs: [],
  },
})
@Injectable()
export class ReportsState {
  constructor(private logsService: LogsService) {}

  @Selector([REPORTS_STATE_TOKEN])
  static getReports(state: ReportsStateModel): LogModel[] {
    return state.logs;
  }

  @Action(Load)
  loadLogs(ctx: StateContext<ReportsStateModel>, _: Load) {
    return this.logsService.load().pipe(
      tap(response => {
        ctx.patchState({
          logs: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
