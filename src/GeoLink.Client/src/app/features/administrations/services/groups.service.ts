import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddNewGroupCommand } from '../models/commands/add-new-group.command';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class GroupsService extends RemoteServiceBase {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  addGroup(command: AddNewGroupCommand): Observable<number> {
    return of(999);
  }

  editGroup(groupId: number, command: AddNewGroupCommand): Observable<any> {
    return of({});
  }
}
