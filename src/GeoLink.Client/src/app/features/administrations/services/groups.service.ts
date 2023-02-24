import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class GroupsService extends RemoteServiceBase {
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

  addGroup(command: AddNewGroupCommand): Observable<number> {
    return of(999);
  }

  editGroup(groupId: number, command: AddNewGroupCommand): Observable<any> {
    return of({});
  }
}
