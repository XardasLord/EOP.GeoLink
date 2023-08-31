import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ReportOpenMode } from '../models/open-mode.enum';
import { SetOpenMode } from '../states/reports.action';

export const ReportResolver: ResolveFn<ReportOpenMode> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store = inject(Store)
): Observable<ReportOpenMode> => {
  let openMode: ReportOpenMode = ReportOpenMode.ForCustomSearch;

  if (route.queryParams['clusterLvl'] && route.queryParams['idCluster']) openMode = ReportOpenMode.ForCluster;

  store.dispatch(new SetOpenMode(openMode));

  return of(openMode);
};
