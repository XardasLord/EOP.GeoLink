import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { IUsersService } from './users.service.base';

@Injectable()
export class UsersService extends IUsersService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllUsers(): Observable<UserModel[]> {
    const users: UserModel[] = [
      {
        name: 'Krzysztof Świerczyński',
        role: 'Administrator',
        group: 'Admin',
      },
      {
        name: 'Przymysław Mączkowski',
        role: 'Użytkownik',
        group: 'Telco, IT, Pomiary',
      },
      {
        name: 'Arkadiusz Ubych',
        role: 'Użytkownik',
        group: 'Telco',
      },
    ];

    return of(users);
  }
}
