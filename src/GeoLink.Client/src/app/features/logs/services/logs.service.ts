import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { GetLogsResponseModel } from '../models/get-logs-response.model';
import { MapFilterModel } from '../../maps/models/map-filter-model';
import { FilterAttributeModel } from '../../../shared/models/filters/filter-attribute.model';
import { GenerateCsvResponseModel } from '../../../shared/models/csv/generate-csv-response.model';
import { GenerateReportRequestModel } from '../../reports/models/http-request-models/generate-report-request.model';

@Injectable()
export class LogsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  load(pageInfo: PageEvent): Observable<GetLogsResponseModel> {
    const params = new HttpParams()
      .set('offset', pageInfo.pageIndex * pageInfo.pageSize)
      .set('count', pageInfo.pageSize);

    return this.httpClient.get<GetLogsResponseModel>(`${this.apiUrl}/logs/getLogs`, { params });
  }

  generateLogCsvRequest(): Observable<GenerateCsvResponseModel> {
    return this.httpClient.post<GenerateCsvResponseModel>(`${this.apiUrl}/logs/logFile/init`, {});
  }

  checkLogCsvGenerationStatus(reportIdentifiedKey: string): Observable<GenerateCsvResponseModel> {
    return this.httpClient.get<GenerateCsvResponseModel>(`${this.apiUrl}/logs/logFile/status/${reportIdentifiedKey}`);
  }
}
