import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { AnalyticsStateModel } from './analytics.state.model';
import { IAnalyticsService } from '../services/analytics.service.base';
import { LoadAlgorithms, LoadConjunctions } from './analytics.action';

const ANALYTICS_STATE_TOKEN = new StateToken<AnalyticsStateModel>('analytics');

@State<AnalyticsStateModel>({
  name: ANALYTICS_STATE_TOKEN,
  defaults: {
    conjunctions: [],
    algorithms: [],
  },
})
@Injectable()
export class AnalyticsState {
  constructor(private analyticsService: IAnalyticsService) {}

  @Selector([ANALYTICS_STATE_TOKEN])
  static getConjunctions(state: AnalyticsStateModel): string[] {
    return state.conjunctions;
  }

  @Selector([ANALYTICS_STATE_TOKEN])
  static getAlgorithms(state: AnalyticsStateModel): string[] {
    return state.algorithms;
  }

  @Action(LoadConjunctions)
  loadConjunctions(ctx: StateContext<AnalyticsStateModel>, _: LoadConjunctions) {
    return this.analyticsService.loadConjunction().pipe(
      tap(response => {
        ctx.patchState({
          conjunctions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(LoadAlgorithms)
  loadAlgorithms(ctx: StateContext<AnalyticsStateModel>, _: LoadAlgorithms) {
    return this.analyticsService.loadAlgorithms().pipe(
      tap(response => {
        ctx.patchState({
          algorithms: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
