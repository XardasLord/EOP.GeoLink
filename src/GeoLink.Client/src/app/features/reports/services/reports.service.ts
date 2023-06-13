import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { ReportModel } from '../models/report.model';
import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';

@Injectable()
export class ReportsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(): Observable<ReportModel[]> {
    const examples: ReportModel[] = [];

    examples.push({
      object: 'GPZ',
      device: 'Licznik',
      ipAddress: '127.0.0.1',
      stationNumber: 1234,
      stationName: 'Test',
      region: 'Gdańsk',
      tan: 'TAN A',
      status: MapObjectStatusTypeEnum.OK,
      availability: 95,
    });

    return of(examples);
    // return this.httpClient.get<LogModel[]>(`${this.apiUrl}/logs/getLogs`, { params });
  }
}