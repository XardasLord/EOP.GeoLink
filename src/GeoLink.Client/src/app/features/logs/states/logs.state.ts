import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { LogsStateModel } from './logs.state.model';
import { ChangePage, DownloadAsCsv, Load } from './logs.action';
import { LogModel } from '../models/log.model';
import { LogsService } from '../services/logs.service';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';

const LOGS_STATE_TOKEN = new StateToken<LogsStateModel>('logs');

@State<LogsStateModel>({
  name: LOGS_STATE_TOKEN,
  defaults: {
    restQuery: new RestQueryVo(),
    restQueryResponse: new RestQueryResponse<LogModel[]>(),
  },
})
@Injectable()
export class LogsState {
  constructor(private logsService: LogsService) {}

  @Selector([LOGS_STATE_TOKEN])
  static getLogs(state: LogsStateModel): LogModel[] {
    return state.restQueryResponse.result;
  }

  @Selector([LOGS_STATE_TOKEN])
  static getLogsCount(state: LogsStateModel): number {
    return state.restQueryResponse.totalCount;
  }

  @Selector([LOGS_STATE_TOKEN])
  static getCurrentPage(state: LogsStateModel): number {
    return state.restQuery.currentPage.pageIndex;
  }

  @Selector([LOGS_STATE_TOKEN])
  static getPageSize(state: LogsStateModel): number {
    return state.restQuery.currentPage.pageSize;
  }

  @Action(Load)
  loadLogs(ctx: StateContext<LogsStateModel>, _: Load) {
    return this.logsService.load(ctx.getState().restQuery.currentPage).pipe(
      tap(response => {
        const customResponse = new RestQueryResponse<LogModel[]>();
        customResponse.result = response.logs;
        customResponse.totalCount = response.logCount;

        ctx.patchState({
          restQueryResponse: customResponse,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(ChangePage)
  changePage(ctx: StateContext<LogsStateModel>, action: ChangePage) {
    const customQuery = new RestQueryVo();
    customQuery.currentPage = action.event;

    ctx.patchState({
      restQuery: customQuery,
    });

    return ctx.dispatch(new Load());
  }

  @Action(DownloadAsCsv)
  downloadAsCsv(ctx: StateContext<LogsStateModel>) {
    // TODO: Download logic
    console.log('Downloading logs as CSV...');
  }
}
