import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { UserAuthModel } from '../auth/models/user-auth.model';
import { User } from 'oidc-client';
import { UserAuthHelper } from '../auth/helpers/user-auth.helper';
import { AuthScopes } from '../auth/models/auth.scopes';
import { AuthState } from '../states/auth.state';
import { AuthRoles } from '../auth/models/auth.roles';

@Injectable()
export class AuthService implements OnDestroy {
  private readonly roleSubscription: Subscription | undefined;
  private userRole: string | undefined;
  private userScopes!: number[];

  user$ = this.store.select(AuthState.getUser);

  constructor(private store: Store) {
    this.roleSubscription = this.user$?.subscribe(user => {
      if (!user) {
        this.userRole = undefined;
        this.userScopes = [];
        return;
      }

      this.userRole = user.role;

      if (user.scopes) {
        this.userScopes = Object.values(user.scopes).map(x => +x as number);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  login(login: string, password: string): Observable<UserAuthModel> {
    // TODO: Http call to Log in

    const mockedUser = new User({
      id_token: '',
      session_state: '',
      profile: {
        iss: '',
        sub: '',
        aud: '',
        exp: 0,
        iat: 0,
        role: AuthRoles.Admin,
        auth_scopes: [AuthScopes.MenuMap, AuthScopes.MenuCharts],
      },
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTM0NTQzNTQzNTQzNTM0NTMiLCJleHAiOjE1MDQ2OTkyNTZ9.zG-2FvGegujxoLWwIQfNB5IT46D-xC4e8dEDYwi6aRM',
      token_type: 'Bearer',
      expires_at: 0,
      refresh_token: '',
      scope: '',
      state: undefined,
    });

    const authUser = UserAuthHelper.parseUserAuthData(mockedUser);

    if (authUser) {
      localStorage.setItem('access_token', authUser.accessToken!);
      localStorage.setItem('user', JSON.stringify(authUser));

      // const expiresAt = moment().add(authResult.expiresIn,'second');
      // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    return of(authUser!);
  }

  logout(): Observable<any> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
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
