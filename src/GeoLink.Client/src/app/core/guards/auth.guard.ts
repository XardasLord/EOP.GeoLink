import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RoutePaths } from '../modules/app-routing.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.store.dispatch(new Navigate([RoutePaths.Login], { returnUrl: state.url }));
    return false;
  }
}
