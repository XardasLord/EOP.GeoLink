import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Logout } from '../../shared/states/auth.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private toastService: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          if (error.status === 401) {
            this.toastService.success('Wylogowano użytkownika', '', {
              onActivateTick: true,
            });

            this.store.dispatch(new Logout());
          }
        }
      )
    );
  }
}
