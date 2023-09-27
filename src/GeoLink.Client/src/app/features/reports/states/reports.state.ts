import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import {
  catchError,
  delay,
  EMPTY,
  filter,
  finalize,
  from,
  interval,
  Observable,
  startWith,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { ReportsStateModel } from './reports.state.model';
import { ChangePage, CheckCsvReportStatus, Load, RequestForCsvReport, SetOpenMode } from './reports.action';
import { ReportsService } from '../services/reports.service';
import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';
import { ReportOpenMode } from '../models/open-mode.enum';
import { FiltersState } from '../../../shared/states/filters.state';
import { ProgressSpinnerService } from '../../../shared/services/progress-spinner.service';
import { DownloadService } from '../../../shared/services/download.service';
import { ToastrService } from 'ngx-toastr';
import { GenerateCsvFileStatus } from '../../../shared/models/csv/generate-csv-response.model';

const REPORTS_STATE_TOKEN = new StateToken<ReportsStateModel>('reports');

@State<ReportsStateModel>({
  name: REPORTS_STATE_TOKEN,
  defaults: {
    loading: false,
    openMode: ReportOpenMode.ForCustomSearch,
    clusterLevel: null,
    idCluster: null,
    restQuery: new RestQueryVo(),
    restQueryResponse: new RestQueryResponse<ReportModel[]>(),
    isDownloadingReport: false,
  },
})
@Injectable()
export class ReportsState {
  constructor(
    private store: Store,
    private reportsService: ReportsService,
    private progressSpinner: ProgressSpinnerService,
    private downloadService: DownloadService,
    private toastService: ToastrService
  ) {}

  @Selector([REPORTS_STATE_TOKEN])
  static getIsLoading(state: ReportsStateModel): boolean {
    return state.loading;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getReports(state: ReportsStateModel): ReportModel[] {
    return state.restQueryResponse.result;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getReportsCount(state: ReportsStateModel): number {
    return state.restQueryResponse.totalCount;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getCurrentPage(state: ReportsStateModel): number {
    return state.restQuery.currentPage.pageIndex;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getPageSize(state: ReportsStateModel): number {
    return state.restQuery.currentPage.pageSize;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getOpenMode(state: ReportsStateModel): ReportOpenMode {
    return state.openMode;
  }

  @Selector([REPORTS_STATE_TOKEN])
  static getClusterLabel(state: ReportsStateModel): string {
    return `${state.clusterLevel}_${state.idCluster}`;
  }

  @Action(Load)
  loadReports(ctx: StateContext<ReportsStateModel>, action: Load) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.reportsService
      .load(
        this.store.selectSnapshot(FiltersState.getSelectedObjectMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters),
        this.store.selectSnapshot(FiltersState.getFilterAttributeModels),
        state.restQuery.currentPage,
        action.includeReportsCount,
        state.clusterLevel,
        state.idCluster
      )
      .pipe(
        tap(response => {
          const customResponse = new RestQueryResponse<ReportModel[]>();
          customResponse.result = response.data;

          if (action.includeReportsCount) {
            customResponse.totalCount = response.reportCount;
          } else {
            customResponse.totalCount = state.restQueryResponse.totalCount;
          }

          ctx.patchState({
            restQueryResponse: customResponse,
          });
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

  @Action(ChangePage)
  changePage(ctx: StateContext<ReportsStateModel>, action: ChangePage) {
    const customQuery = new RestQueryVo();
    customQuery.currentPage = action.event;

    ctx.patchState({
      restQuery: customQuery,
    });

    return ctx.dispatch(new Load(false));
  }

  @Action(SetOpenMode)
  setOpenedForGroupReport(ctx: StateContext<ReportsStateModel>, action: SetOpenMode) {
    ctx.setState(
      patch({
        openMode: action.openMode,
        clusterLevel: action.openMode === ReportOpenMode.ForCluster ? action.clusterLevel : null,
        idCluster: action.openMode === ReportOpenMode.ForCluster ? action.idCluster : null,
      })
    );
  }

  @Action(RequestForCsvReport)
  requestForCsvReport(ctx: StateContext<ReportsStateModel>) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.reportsService
      .generateReportCsvRequest(
        this.store.selectSnapshot(FiltersState.getSelectedObjectMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters),
        this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters),
        this.store.selectSnapshot(FiltersState.getFilterAttributeModels),
        state.clusterLevel,
        state.idCluster
      )
      .pipe(
        tap(response => {
          this.toastService.success(
            'Generowanie raportu zostało zlecone. Gdy raport będzie gotowy to zostanie automatycznie ściągnięty.',
            'Raport CSV'
          );

          ctx.dispatch(new CheckCsvReportStatus(response.key));
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

  @Action(CheckCsvReportStatus)
  checkCsvReportStatus(ctx: StateContext<ReportsStateModel>, action: CheckCsvReportStatus) {
    const reportIdentifierKey = action.reportIdentifierKey;

    const checkReportGenerationStatus = () => {
      const isDownloadingReport = ctx.getState().isDownloadingReport;

      if (isDownloadingReport) {
        return EMPTY;
      }

      return this.reportsService.checkReportGenerationStatus(reportIdentifierKey).pipe(
        filter(response => !!response),
        switchMap(response => {
          switch (response.status) {
            case GenerateCsvFileStatus.GENERATED:
              ctx.patchState({ isDownloadingReport: true });

              return this.downloadService.downloadFileFromApi(`/reports/reportFile/download/${response.key}`).pipe(
                switchMap(resBlob => {
                  this.downloadService.getFile(resBlob, 'GeolinkRaport.csv');
                  this.toastService.success('Raport CSV został pobrany.', 'Raport CSV');

                  return EMPTY;
                }),
                catchError(() => {
                  this.toastService.error(`Błąd podczas pobierania raportu CSV`, 'Raport CSV');

                  return EMPTY;
                }),
                finalize(() => {
                  ctx.patchState({ isDownloadingReport: false });
                })
              );
            case GenerateCsvFileStatus.IN_PROGRESS:
              return EMPTY;
            case GenerateCsvFileStatus.ERROR:
              this.toastService.error(`Błąd podczas generowania raportu CSV - ${response.message}`, 'Raport CSV');
              ctx.patchState({ isDownloadingReport: false });

              return EMPTY;
            default:
              return EMPTY;
          }
        }),
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => {
          ctx.patchState({ isDownloadingReport: false });
        })
      );
    };

    // interval(10000)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => checkReportGenerationStatus()),
    //     takeUntil(interval(1000).pipe(filter(() => !ctx.getState().isDownloadingReport)))
    //   )
    //   .subscribe();

    const recursiveCheck: () => Observable<any> = () => {
      return checkReportGenerationStatus().pipe(
        delay(10000),
        switchMap(() => recursiveCheck()),
        takeUntil(interval(1000).pipe(filter(() => !ctx.getState().isDownloadingReport)))
      );
    };

    recursiveCheck().subscribe();
  }
}
