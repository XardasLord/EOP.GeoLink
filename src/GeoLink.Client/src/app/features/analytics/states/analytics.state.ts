import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { AnalyticsStateModel } from './analytics.state.model';
import { ChangePage, LoadAnalytic, LoadAvailableAnalytics } from './analytics.action';
import { AnalyticsService } from '../services/analytics.service';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { AvailableAnalyticsModel } from '../models/available-analytics.model';
import { AnalyticModel, AnalyticsDynamicCell } from '../models/analytic.model';

const ANALYTICS_STATE_TOKEN = new StateToken<AnalyticsStateModel>('analytics');

@State<AnalyticsStateModel>({
  name: ANALYTICS_STATE_TOKEN,
  defaults: {
    loading: false,
    restQuery: new RestQueryVo(),
    availableAnalytics: [],
    analytic: null,
  },
})
@Injectable()
export class AnalyticsState {
  constructor(private analyticsService: AnalyticsService) {}

  @Selector([ANALYTICS_STATE_TOKEN])
  static getAvailableAnalytics(state: AnalyticsStateModel): AvailableAnalyticsModel[] {
    return state.availableAnalytics;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getAnalytic(state: AnalyticsStateModel): AnalyticModel {
    return state.analytic!;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getAnalyticData(state: AnalyticsStateModel): AnalyticsDynamicCell[][] {
    return state.analytic?.data.map(x => x.cells)!;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getIsLoading(state: AnalyticsStateModel): boolean {
    return state.loading!;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getTotalItems(state: AnalyticsStateModel): number {
    return state.analytic?.recordCount ?? 0;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getCurrentPage(state: AnalyticsStateModel): number {
    return state.restQuery.currentPage.pageIndex;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getPageSize(state: AnalyticsStateModel): number {
    return state.restQuery.currentPage.pageSize;
  }

  @Action(LoadAvailableAnalytics)
  loadAvailableAnalytics(ctx: StateContext<AnalyticsStateModel>, _: LoadAvailableAnalytics) {
    ctx.patchState({
      loading: true,
    });

    return this.analyticsService.getAvailableAnalytics().pipe(
      tap(response => {
        ctx.patchState({
          availableAnalytics: response,
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

  @Action(LoadAnalytic)
  loadAnalytic(ctx: StateContext<AnalyticsStateModel>, action: LoadAnalytic) {
    const state = ctx.getState();

    ctx.patchState({
      loading: true,
    });

    return this.analyticsService
      .getAnalytics(action.idAnalytic, state.restQuery.currentPage, action.includeAnalyticsCount)
      .pipe(
        tap(response => {
          if (!action.includeAnalyticsCount) {
            response.recordCount = state.analytic?.recordCount ?? response.recordCount;
          }

          ctx.patchState({
            analytic: response,
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
  changePage(ctx: StateContext<AnalyticsStateModel>, action: ChangePage) {
    const customQuery = new RestQueryVo();
    customQuery.currentPage = action.event;

    ctx.patchState({
      restQuery: customQuery,
    });

    return ctx.dispatch(new LoadAnalytic(action.idAnalytic, false));
  }
}
