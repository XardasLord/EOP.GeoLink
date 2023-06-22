import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { LogsStateModel } from './logs.state.model';
import { Load } from './logs.action';
import { LogModel } from '../models/log.model';
import { LogsService } from '../services/logs.service';

const LOGS_STATE_TOKEN = new StateToken<LogsStateModel>('logs');

@State<LogsStateModel>({
  name: LOGS_STATE_TOKEN,
  defaults: {
    logs: [],
    logsCount: 0,
    logsOffset: 0,
  },
})
@Injectable()
export class LogsState {
  constructor(private logsService: LogsService) {}

  @Selector([LOGS_STATE_TOKEN])
  static getLogs(state: LogsStateModel): LogModel[] {
    return state.logs;
  }

  @Selector([LOGS_STATE_TOKEN])
  static getLogsCount(state: LogsStateModel): number {
    return state.logsCount;
  }

  @Action(Load)
  loadLogs(ctx: StateContext<LogsStateModel>, _: Load) {
    return this.logsService.load().pipe(
      tap(response => {
        ctx.patchState({
          logs: response.logs,
          logsCount: response.logCount,
          logsOffset: response.logOffset,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
