import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  login(login: string, password: string) {
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTM0NTQzNTQzNTQzNTM0NTMiLCJleHAiOjE1MDQ2OTkyNTZ9.zG-2FvGegujxoLWwIQfNB5IT46D-xC4e8dEDYwi6aRM';

    // const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('access_token', jwtToken);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    return of(jwtToken);
  }

  logout() {
    localStorage.removeItem('access_token');
    // localStorage.removeItem("expires_at");
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
