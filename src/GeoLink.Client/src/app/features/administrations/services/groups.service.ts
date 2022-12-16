import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IGroupsService } from './groups.service.base';
import { GroupModel } from '../models/group.model';
import { AddNewGroupCommand } from '../commands/add-new-group.command';

@Injectable()
export class GroupsService extends IGroupsService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllGroups(): Observable<GroupModel[]> {
    const groups: GroupModel[] = [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'TELCO',
      },
      {
        id: 3,
        name: 'POMIARY',
      },
      {
        id: 4,
        name: 'SCADA',
      },
      {
        id: 5,
        name: 'IT',
      },
    ];

    return of(groups);
  }

  addNewGroup(command: AddNewGroupCommand): Observable<number> {
    return of(999);
  }
}
