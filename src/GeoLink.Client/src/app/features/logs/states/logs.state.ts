import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { LogsStateModel } from './logs.state.model';
import { Load } from './logs.action';
import { ILogsService } from '../services/logs.service.base';
import { LogModel } from '../models/log.model';

const LOGS_STATE_TOKEN = new StateToken<LogsStateModel>('logs');

@State<LogsStateModel>({
  name: LOGS_STATE_TOKEN,
  defaults: {
    logs: [],
  },
})
@Injectable()
export class LogsState {
  constructor(private logsService: ILogsService) {}

  @Selector([LOGS_STATE_TOKEN])
  static getLogs(state: LogsStateModel): LogModel[] {
    return state.logs;
  }

  @Action(Load)
  loadLogs(ctx: StateContext<LogsStateModel>, _: Load) {
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
