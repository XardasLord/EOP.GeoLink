import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, EMPTY, filter, finalize, interval, startWith, switchMap, takeUntil, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LogsStateModel } from './logs.state.model';
import { ChangePage, RequestForCsvLogs, Load, CheckCsvLogStatus } from './logs.action';
import { LogModel } from '../models/log.model';
import { LogsService } from '../services/logs.service';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';
import { ReportsStateModel } from '../../reports/states/reports.state.model';
import { GenerateCsvFileStatus } from '../../../shared/models/csv/generate-csv-response.model';
import { DownloadService } from '../../../shared/services/download.service';

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
  constructor(
    private logsService: LogsService,
    private downloadService: DownloadService,
    private toastService: ToastrService
  ) {}

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

  @Action(RequestForCsvLogs)
  requestForCsvReport(ctx: StateContext<ReportsStateModel>) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.logsService.generateLogCsvRequest().pipe(
      tap(response => {
        this.toastService.success(
          'Generowanie raportu zostało zlecone. Gdy raport będzie gotowy to zostanie automatycznie ściągnięty.',
          'Raport CSV'
        );

        ctx.dispatch(new CheckCsvLogStatus(response.key));
      }),
      catchError(error => {
        return throwError(error);
      }),
      finalize(() => {
        ctx.patchState({
          loading: false,
        });
      })
    );
  }

  @Action(CheckCsvLogStatus)
  checkCsvReportStatus(ctx: StateContext<ReportsStateModel>, action: CheckCsvLogStatus) {
    const reportIdentifierKey = action.reportIdentifierKey;
    let isCompleted = false;

    const checkReportGenerationStatus = () => {
      if (isCompleted) {
        return EMPTY;
      }

      return this.logsService.checkLogCsvGenerationStatus(reportIdentifierKey).pipe(
        filter(response => !!response),
        switchMap(response => {
          switch (response.status) {
            case GenerateCsvFileStatus.GENERATED:
              return this.downloadService.downloadFileFromApi(`/logs/logFile/download/${response.key}`).pipe(
                switchMap(resBlob => {
                  this.downloadService.getFile(resBlob, 'GeolinkLog.csv');
                  isCompleted = true;
                  this.toastService.success('Raport CSV został pobrany.', 'Raport CSV');
                  return EMPTY;
                }),
                catchError(() => {
                  this.toastService.error(`Błąd podczas pobierania raportu CSV`, 'Raport CSV');
                  isCompleted = true;
                  return EMPTY;
                })
              );
            case GenerateCsvFileStatus.IN_PROGRESS:
              return interval(5000);
            case GenerateCsvFileStatus.ERROR:
              this.toastService.error(`Błąd podczas generowania raportu CSV - ${response.message}`, 'Raport CSV');
              isCompleted = true;
              return EMPTY;
            default:
              return EMPTY;
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    };

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => checkReportGenerationStatus()),
        takeUntil(interval(1).pipe(filter(() => isCompleted)))
      )
      .subscribe();
  }
}
