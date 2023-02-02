import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAuthModel } from '../auth/models/user-auth.model';
import { User } from 'oidc-client';
import { UserAuthHelper } from '../auth/helpers/user-auth.helper';

@Injectable()
export class AuthService {
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
      // const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem('access_token', authUser.accessToken!);
      // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    return of(authUser!);
  }

  logout(): Observable<any> {
    localStorage.removeItem('access_token');
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
    // if (this.userRole === AuthRoles.Admin) {
    //   return true;
    // }

    return true;

    if (!scopes) {
      return false;
    }

    // return scopes.filter((scope) => scope != null).some((scope) => this.userScopes.includes(scope));
  }
}
