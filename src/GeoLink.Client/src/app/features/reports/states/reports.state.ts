import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ReportsStateModel } from './reports.state.model';
import { ChangeFilters, ChangePage, Load } from './reports.action';
import { ReportsService } from '../services/reports.service';
import { ReportModel } from '../models/report.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponse } from '../../../shared/models/pagination/rest.response';

const REPORTS_STATE_TOKEN = new StateToken<ReportsStateModel>('reports');

@State<ReportsStateModel>({
  name: REPORTS_STATE_TOKEN,
  defaults: {
    loading: false,
    restQuery: new RestQueryVo(),
    restQueryResponse: new RestQueryResponse<ReportModel[]>(),
    selectedObjectMapFilters: [],
    selectedRegionMapFilters: [],
    selectedStatusMapFilters: [],
    selectedIpMapFilters: [],
  },
})
@Injectable()
export class ReportsState {
  constructor(private reportsService: ReportsService) {}

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

  @Action(Load)
  loadReports(ctx: StateContext<ReportsStateModel>, action: Load) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.reportsService
      .load(
        state.selectedObjectMapFilters,
        state.selectedRegionMapFilters,
        state.selectedStatusMapFilters,
        state.selectedIpMapFilters,
        state.restQuery.currentPage,
        action.includeReportsCount
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

  @Action(ChangeFilters)
  changeFilters(ctx: StateContext<ReportsStateModel>, action: ChangeFilters) {
    ctx.patchState({
      selectedObjectMapFilters: action.selectedObjectMapFilters,
      selectedRegionMapFilters: action.selectedRegionMapFilters,
      selectedStatusMapFilters: action.selectedStatusMapFilters,
      selectedIpMapFilters: action.selectedIpMapFilters,
    });

    return ctx.dispatch(new Load());
  }
}
