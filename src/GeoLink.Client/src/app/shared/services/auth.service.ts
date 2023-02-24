import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { User } from 'oidc-client';
import { AuthState } from '../states/auth.state';
import { AuthRoles } from '../auth/models/auth.roles';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService implements OnDestroy {
  private readonly roleSubscription: Subscription | undefined;
  private userRole: string | undefined;
  private userScopes!: number[];

  user$ = this.store.select(AuthState.getUser);

  constructor(private store: Store, private httpClient: HttpClient) {
    this.roleSubscription = this.user$?.subscribe(user => {
      if (!user) {
        this.userRole = undefined;
        this.userScopes = [];
        return;
      }

      this.userRole = user.role;

      if (user.auth_scopes) {
        this.userScopes = Object.values(user.auth_scopes).map(x => +x as number);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  login(login: string, password: string): Observable<User> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('Login', login);
    queryParams = queryParams.append('Password', password);

    const apiEndpoint = environment.apiEndpoint;

    return this.httpClient.get<User>(`${apiEndpoint}/auth/getToken`, { params: queryParams });
  }

  logout(): Observable<any> {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user');
    // localStorage.removeItem("expires_at");

    return of({});
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') === null;
    // return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem('expires_at');
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }

  public isUserAllowedByScopes(scopes: number[]): boolean {
    if (this.userRole === AuthRoles.Admin) {
      return true;
    }

    if (!scopes) {
      return false;
    }

    return scopes.filter(scope => scope != null).some(scope => this.userScopes.includes(scope));
  }
}
