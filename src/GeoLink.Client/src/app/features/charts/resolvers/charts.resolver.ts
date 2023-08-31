import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ChartOpenMode } from '../models/open-mode.enum';
import { SetOpenMode } from '../states/charts.action';

export const ChartResolver: ResolveFn<ChartOpenMode> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store = inject(Store)
): Observable<ChartOpenMode> => {
  let openMode: ChartOpenMode = ChartOpenMode.ForCustomSearch;

  if (route.queryParams['clusterLvl'] && route.queryParams['idCluster']) openMode = ChartOpenMode.ForCluster;

  store.dispatch(new SetOpenMode(openMode, route.queryParams['clusterLvl'], route.queryParams['idCluster']));

  return of(openMode);
};
