import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IGroupsService } from './groups.service.base';
import { GroupModel } from '../models/group.model';

@Injectable()
export class GroupsService extends IGroupsService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllGroups(): Observable<GroupModel[]> {
    const groups: GroupModel[] = [
      {
        name: 'ADMIN',
      },
      {
        name: 'TELCO',
      },
      {
        name: 'POMIARY',
      },
      {
        name: 'SCADA',
      },
      {
        name: 'IT',
      },
    ];

    return of(groups);
  }
}
