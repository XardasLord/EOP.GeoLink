import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { ReportsStateModel } from './reports.state.model';
import { Load } from './reports.action';
import { ReportsService } from '../services/reports.service';
import { ReportModel } from '../models/report.model';

const REPORTS_STATE_TOKEN = new StateToken<ReportsStateModel>('reports');

@State<ReportsStateModel>({
  name: REPORTS_STATE_TOKEN,
  defaults: {
    reports: [],
  },
})
@Injectable()
export class ReportsState {
  constructor(private reportsService: ReportsService) {}

  @Selector([REPORTS_STATE_TOKEN])
  static getReports(state: ReportsStateModel): ReportModel[] {
    return state.reports;
  }

  @Action(Load)
  loadLogs(ctx: StateContext<ReportsStateModel>, _: Load) {
    return this.reportsService.load().pipe(
      tap(response => {
        ctx.patchState({
          reports: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
